# Telegram Slot Machine

A fun and interactive slot machine game for Telegram, built with Node.js, Express, and Vite.

## Prerequisites

- Node.js (version specified in `packages/frontend/Dockerfile` and `packages/backend/Dockerfile`)
- pnpm (version specified in `package.json`)
- Telegram Bot Token
- Fly.io account (for deployment)

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
   FRONTEND_URL=https://your-frontend-url.fly.dev
   ```

4. Configure the frontend URL:
   Update the `backendUrl` in `packages/frontend/src/game.ts` to match your backend deployment URL.

## Development

To run the project locally:

1. Start the frontend development server:

   ```
   pnpm run dev:frontend
   ```

2. Start the backend server:
   ```
   pnpm run start:backend
   ```

## Deployment

This project is configured for deployment on Fly.io. Make sure you have the Fly CLI installed and are logged in.

1. Deploy the frontend:

   ```
   pnpm run deploy:frontend
   ```

2. Deploy the backend:
   ```
   pnpm run deploy:backend
   ```

Alternatively, you can deploy both at once:

```
pnpm run deploy:all
```

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
