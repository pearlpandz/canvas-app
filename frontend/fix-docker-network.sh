#!/bin/bash

set -e

echo "🔧 Creating or updating Docker daemon config..."

# Step 1: Set DNS config
DOCKER_CONFIG=~/.docker/daemon.json
mkdir -p ~/.docker

cat > "$DOCKER_CONFIG" <<EOF
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
EOF

echo "✅ DNS set to Google DNS in $DOCKER_CONFIG"

# Step 2: Restart WSL2 and Docker
echo "🔄 Restarting WSL and Docker..."
wsl --shutdown

echo "⏳ Waiting for Docker to restart..."
sleep 5

# Optional: Restart Docker Desktop if needed (Windows-specific)
if command -v powershell.exe &> /dev/null; then
  powershell.exe -Command "Start-Process 'Docker Desktop'"
fi

# Step 3: Build with host network
echo "🚀 Building Docker image using host network..."
docker build --network=host -t react-app .

echo "✅ Done! React app Docker image built successfully."
