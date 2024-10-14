#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  # Export each line manually, ensuring values are handled correctly
  set -a  # Automatically export all variables
  source .env
  set +a  # Stop automatic export
fi

# Run the CLI command using the exposed environment variables
flyctl deploy --build-arg BOT_TOKEN="$BOT_TOKEN" --build-arg FRONTEND_URL="$FRONTEND_URL" --build-arg PORT="$PORT" --build-arg API_SECRET="$API_SECRET"