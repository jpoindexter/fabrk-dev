#!/bin/bash
# Production deployment script
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found"
  exit 1
fi

# Load environment variables
export $(cat .env | xargs)

# Build Docker image
echo "📦 Building Docker image..."
docker build -t fabrk:latest .

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Start new containers
echo "▶️  Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
echo "🗄️  Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T app npx prisma migrate deploy

# Health check
echo "🏥 Running health check..."
sleep 5
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)

if [ "$HEALTH_STATUS" -eq 200 ]; then
  echo "✅ Deployment successful! Application is healthy."
else
  echo "❌ Deployment failed! Health check returned $HEALTH_STATUS"
  docker-compose -f docker-compose.prod.yml logs app
  exit 1
fi

echo "🎉 Deployment complete!"
