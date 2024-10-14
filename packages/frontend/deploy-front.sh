#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  # Export each line manually, ensuring values are handled correctly
  set -a  # Automatically export all variables
  source .env
  set +a  # Stop automatic export
fi

# Run the CLI command using the exposed environment variables
flyctl deploy --build-arg VITE_BACKEND_URL="$VITE_BACKEND_URL" --build-arg VITE_API_SECRET="$VITE_API_SECRET"
