import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Bot, InlineKeyboard } from "grammy";
import { verifyDigest } from "./utils.js";

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

const GAME_SHORT_NAME = "slotmachine";
const GAME_URL = `${process.env.FRONTEND_URL}`;

const API_SECRET = `${process.env.API_SECRET}`;

app.get("/", (req, res) => {
  res.send("Hello World");
});

bot.command("play", async ctx => {
  const keyboard = new InlineKeyboard().game("Play Slot Machine");
  await ctx.replyWithGame(GAME_SHORT_NAME, { reply_markup: keyboard });
});

bot.on("callback_query:game_short_name", async ctx => {
  console.log("Received a callback query:", ctx.callbackQuery);
  const user_id = ctx.from.id;
  let url = `${GAME_URL}?uid=${user_id}`;

  if (ctx.callbackQuery.message) {
    const msgId = ctx.callbackQuery.message.message_id;
    const chat_id = ctx.chat.id;
    url += `&chat_id=${chat_id}&msgid=${msgId}`;
  } else if (ctx.callbackQuery.inline_message_id) {
    const inlineMessageId = ctx.callbackQuery.inline_message_id;
    url += `&iid=${inlineMessageId}`;
  }

  try {
    await ctx.answerCallbackQuery({ url });
  } catch (error) {
    if (error.description.includes("query is too old")) {
      console.log("Callback query expired, sending new game URL");
      await ctx.answerCallbackQuery({ text: "Game session expired. Please start a new game." });
    } else {
      console.error("Error answering callback query:", error);
    }
  }
});

app.post("/setScore", async (req, res) => {
  console.log("Received a setScore request:", JSON.stringify(req.body, null, 2));
  const { score, userId, inlineMessageId } = req.body;
  const payloadHash = req.header("payload-hash");

  console.log("###->>> message_id", inlineMessageId);

  if (!score || !userId || !inlineMessageId) {
    console.error("Missing required parameters:", { score, userId, inlineMessageId });
    return res.status(400).json({ error: "Missing required parameters" });
  }

  if (!payloadHash) {
    console.error("Missing payload-hash header");
    return res.status(400).json({ error: "Missing payload-hash header" });
  }

  if (!verifyDigest(API_SECRET, { score, userId, inlineMessageId }, payloadHash)) {
    console.error("The payload does not match the hash");
    return res.status(400).json({ error: "The payload does not match the hash" });
  }

  try {
    let result;
    if (inlineMessageId) {
      result = await bot.api.setGameScore(
        null, // chat_id
        null, // message_id
        parseInt(userId), // user_id
        parseInt(score), // score
        {
          inline_message_id: inlineMessageId,
          force: true,
        },
      );
    } else {
      throw new Error("Invalid message identifiers");
    }

    console.log("SetGameScore result:", JSON.stringify(result, null, 2));
    res.status(200).json({ message: "Score set successfully", result });
  } catch (error) {
    console.error("Error setting game score:", error);
    res.status(500).json({ error: "Failed to set game score", details: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.start();

bot.catch(err => {
  console.error("Error in bot:", err);
});
