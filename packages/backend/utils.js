import crypto from "crypto";
import determStringify from "fast-json-stable-stringify";

export function verifyDigest(secret, body, receivedDigest) {
  const sha256 = crypto.createHash("sha256");
  const message = `${secret}${determStringify(body)}`;
  const digest = sha256.update(message).digest("base64");
  return digest === receivedDigest;
}
