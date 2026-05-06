#!/bin/bash

# Create basic files for each service
SERVICES=("asset-management" "integration-gateway" "capital-planning" "sustainability-esg" "identity-access" "reporting-analytics")

for SERVICE in "${SERVICES[@]}"; do
  cat <<EOF > services/$SERVICE/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EOF

  cat <<EOF > services/$SERVICE/package.json
{
  "name": "$SERVICE",
  "version": "1.0.0",
  "description": "Healthcare Asset Platform - $SERVICE",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

  cat <<EOF > services/$SERVICE/src/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: '$SERVICE' });
});

app.listen(port, () => {
  console.log(\`$SERVICE listening on port \${port}\`);
});
EOF

  cat <<EOF > services/$SERVICE/README.md
# $SERVICE

This microservice is part of the Healthcare Asset Management Platform.

## Responsibilities
Refer to the main architecture document for detailed responsibilities.

## Running locally
\`\`\`bash
npm install
npm start
\`\`\`
EOF
done

# Frontend Web
cat <<EOF > frontend/web/package.json
{
  "name": "healthcare-asset-web",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
EOF

cat <<EOF > frontend/web/Dockerfile
FROM nginx:alpine
COPY build/ /usr/share/nginx/html
EOF

# Frontend Mobile
cat <<EOF > frontend/mobile/pubspec.yaml
name: healthcare_asset_mobile
description: A new Flutter project.
version: 1.0.0+1
environment:
  sdk: '>=3.0.0 <4.0.0'
dependencies:
  flutter:
    sdk: flutter
EOF

# Infra
cat <<EOF > infra/docker-compose.yml
version: '3.8'
services:
  asset-management:
    build: ../services/asset-management
    ports:
      - "3001:3000"
  integration-gateway:
    build: ../services/integration-gateway
    ports:
      - "3002:3000"
  kafka:
    image: bitnami/kafka:latest
    ports:
      - "9092:9092"
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
EOF

# Gitignore
cat <<EOF > .gitignore
node_modules/
.env
dist/
build/
*.log
.DS_Store
EOF

echo "Scaffolding complete!"
