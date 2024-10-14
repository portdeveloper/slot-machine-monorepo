# Telegram Slot Machine Game

A basic slot machine game for Telegram, built with Node.js, Express, and Vite.

## Prerequisites

- Node.js (version specified in `packages/frontend/Dockerfile` and `packages/backend/Dockerfile`)
- pnpm (version specified in `package.json`)
- Telegram Bot Token
- Fly.io account (for deployment)

## Telegram Bot Setup

1. Start a chat with [@BotFather](https://t.me/BotFather) on Telegram.
2. Send `/newbot` to create a new bot.
3. Choose a name and username for your bot.
4. After creating the bot, BotFather will provide you with a token. Save this token securely.
5. Enable inline mode for your bot:
   - Send `/setinline` to BotFather.
   - Choose your bot.
   - Set a placeholder message (e.g., "Play Slot Machine game directly in any chat!").
6. Create a new game for your bot:
   - Send `/newgame` to BotFather.
   - Choose your bot.
   - Set a title for the game (e.g., "Slot Machine").
   - Provide a short description.
   - Upload a photo (640x360 pixels) for the game.
   - Add a demo GIF or skip the demo GIF step by sending `/empty`.
   - Choose a short name for the game (e.g., "slotmachine").
7. BotFather will provide you with a game link. Use this link to start developing your game.

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/slot-machine-monorepo.git
   cd slot-machine-monorepo
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `packages/backend` directory with the following content:

   ```
   BOT_TOKEN=your_telegram_bot_token
   FRONTEND_URL=http://localhost:5173  # For local development
   API_SECRET=your_chosen_api_secret
   ```

   Remember to replace `your_telegram_bot_token` with the actual token you received from BotFather.

4. Configure the frontend URL:
   Update the `backendUrl` in `packages/frontend/src/game.ts` to match your backend deployment URL.

## Local Setup and Development

1. Clone the repository:

   ```
   git clone https://github.com/your-username/slot-machine-monorepo.git
   cd slot-machine-monorepo
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `packages/backend` directory with the following content:

   ```
   BOT_TOKEN=your_telegram_bot_token
   FRONTEND_URL=http://localhost:5173  # For local development
   API_SECRET=your_chosen_api_secret
   ```

   Remember to replace `your_telegram_bot_token` with the actual token you received from BotFather.

4. Configure the frontend:
   Update the `backendUrl` in `packages/frontend/src/game.ts`:

   ```typescript
   const backendUrl = "http://localhost:8080"; // For local development
   ```

5. Set up frontend environment variables:
   Create a `.env` file in the `packages/frontend` directory with the following content:

   ```
   VITE_BACKEND_URL=http://localhost:8080  # For local development
   API_SECRET=your_chosen_api_secret
   ```

   Remember to update this URL when deploying to production.

6. Start the frontend development server:

   ```
   pnpm run dev:frontend
   ```

   This will start the Vite development server, typically on http://localhost:5173.

7. In a new terminal, start the backend server:

   ```
   pnpm run start:backend
   ```

   This will start the Express server, typically on http://localhost:3000.

8. Open your browser and navigate to http://localhost:5173 to see the frontend.

9. To test the Telegram integration locally, you may need to use a tool like ngrok to expose your local server to the internet. Update the `FRONTEND_URL` in your `.env` file and the `backendUrl` in the frontend code with the ngrok(or similar service) URL when testing.

Remember to update these URLs and environment variables when deploying to production.

## Development Workflow

1. Make changes to the frontend code in `packages/frontend/src/`.
2. Make changes to the backend code in `packages/backend/`.
3. The frontend will automatically reload when you make changes.
4. For backend changes, you may need to restart the server (stop it with Ctrl+C and run `pnpm run start:backend` again).
5. Always test your changes thoroughly before committing.
6. Use `pnpm run format` to format your code before committing.

## Deployment

This project is configured for deployment on Fly.io. Make sure you have the Fly CLI installed and are logged in.

1. Update environment variables:

   In `packages/backend/.env`:

   ```
   BOT_TOKEN=your_telegram_bot_token
   FRONTEND_URL=https://your-production-frontend-url.fly.dev
   API_SECRET=your_chosen_api_secret
   ```

   In `packages/frontend/.env`:

   ```
   VITE_BACKEND_URL=https://your-production-backend-url.fly.dev
   API_SECRET=your_chosen_api_secret
   ```

2. Deploy the frontend:

   ```
   pnpm run deploy:frontend
   ```

3. Deploy the backend:

   ```
   pnpm run deploy:backend
   ```

   Alternatively, you can deploy both at once:

   ```
   pnpm run deploy:all
   ```

Note: Make sure your Fly.io account has the necessary resources allocated for both the frontend and backend applications. You may need to adjust the `fly.toml` files in each package if you encounter any issues with resource allocation or scaling. If you have issues with env varibales not being set properly in the container for the front-end check in the Dockerfile line #15.

For more detailed information on Fly.io deployment, refer to their [documentation](https://fly.io/docs/languages-and-frameworks/).

## Environment Variables

Deployment scripts are taking care of environement variables for you, which means that you don't need anymore to add secrets manually on fly.io. In order to add environment variables for any of the apps (front or back) follow these instructions:

1. Add the desired env var in the .env file in the directory corresponding to the app (packages/frontend/.env or packages/backend/.env).
2. Add the environement variable in the CLI command of the deployment script (deploy-back.sh or deploy-front.sh) using the already present models.
3. Add the build ARG & ENV instructions in the corresponding Dockerfile under the `#Define env arguments here` section.

## Contributing

Contributions are welcome! Please follow these steps:

1. Open an issue to discuss the proposed changes before starting work
2. Fork the repository
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes and commit them: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

When submitting a pull request, please use the provided PR template. For bug reports, please use the bug report template.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
