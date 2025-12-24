# Fabrotec Test - Mobile Game Leaderboard API

A RESTful API for a mobile game that allows players to submit their high scores and view the leaderboard.

## Features

- **User Management**: Create and manage user accounts with roles (admin/user)
- **Authentication**: JWT-based authentication for secure access
- **Score Submission**: Submit high scores with authorization checks
- **Leaderboard**: Public endpoint to view top scores
- **Rate Limiting**: 10 requests per 10 seconds to prevent abuse
- **Request Logging**: All requests logged with IP, method, endpoint, and status
- **Docker Support**: Containerized application with MySQL database

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: MySQL 8.0 with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose

## Project Setup

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose
- npm

### Installation

```bash
npm install
```

## Running the Application

### With Docker (Recommended)

#### Development Mode (with hot-reload):
```bash
# Start containers
npm run docker:dev

# Rebuild containers (after package changes)
npm run docker:dev:build

# Stop containers
npm run docker:dev:down
```

#### Production Mode:
```bash
# Build and start
npm run docker:build
npm run docker:up

# Stop
npm run docker:down
```

### Without Docker

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

### Swagger UI

Access the interactive API documentation at:
- **URL**: http://localhost:3000/public/api
- **Features**: 
  - Try out all endpoints
  - View request/response schemas
  - Test authentication with JWT tokens

### API Endpoints

#### Public Endpoints (No Authentication Required)

**Get Leaderboard**
```bash
GET /leaderboards?limit=10
```

**Create User**
```bash
POST /users
Content-Type: application/json

{
  "name": "Player1",
  "password": "password123",
  "role": "user"
}
```

**Login**
```bash
POST /auth/login
Content-Type: application/json

{
  "name": "Player1",
  "password": "password123"
}
```

#### Protected Endpoints (Authentication Required)

**Submit Score**
```bash
POST /scores
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "value": 95.5
}
```

**Admin: Submit Score for Another User**
```bash
POST /scores
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json

{
  "value": 88.0,
  "userId": 2
}
```

## cURL Examples

### 1. Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Player1",
    "password": "password123",
    "role": "user"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Player1",
    "password": "password123"
  }'
```

### 3. Submit Score
```bash
curl -X POST http://localhost:3000/scores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "value": 95.5
  }'
```

### 4. Get Leaderboard
```bash
curl -X GET "http://localhost:3000/leaderboards?limit=10"
```

## Authorization Rules

1. **Authentication**: JWT tokens required for score submission
2. **User Authorization**: Regular users can only submit scores for themselves
3. **Admin Authorization**: Admins can submit scores for any user
4. **Rate Limiting**: All endpoints limited to 10 requests per 10 seconds

## Database

### Schema

**Users Table**
- `id`: Auto-increment integer
- `name`: String (max 100 chars)
- `password`: Hashed string (bcrypt)
- `role`: Enum (admin/user)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

**Scores Table**
- `id`: Auto-increment integer
- `value`: Decimal (0-100)
- `userId`: Foreign key to users
- `createdAt`: Timestamp

### Docker Volumes

Data persists in Docker volume: `mysql_data`

To reset the database:
```bash
docker-compose -f docker-compose.dev.yml down -v
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=fabrotec_user
DATABASE_PASSWORD=fabrotec_pass
DATABASE_NAME=fabrotec_db

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d
```

## Logging

All requests are logged to:
- **File**: `logs/requests.log`
- **Console**: Development mode only

Log format includes:
- Timestamp
- HTTP method
- Endpoint
- Status code
- Client IP address
- User agent

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/              # Authentication module (JWT strategy)
├── users/             # User management module
├── scores/            # Score submission module
├── leaderboards/      # Leaderboard module
├── common/            # Shared middleware (logging)
├── app.module.ts      # Root module
└── main.ts            # Application entry point
```

## License

[MIT licensed](LICENSE)
