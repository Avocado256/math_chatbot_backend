# Math Chatbot Backend

A NestJS-based backend API for a mathematics chatbot application that helps users solve math problems through interactive conversations.

## Overview

This project provides a robust backend service for a math chatbot, built with modern Node.js technologies. The application allows users to interact with an AI-powered chatbot that can understand and solve various mathematical problems.

## Tech Stack

- **Framework**: NestJS (Node.js framework)
- **Database**: Prisma ORM
- **Language**: TypeScript
- **Testing**: Jest
- **Configuration**: Environment-based configuration with @nestjs/config

## Project Structure

```
src/
├── app.module.ts          # Main application module
├── app.controller.ts      # Application controller
├── app.service.ts         # Application service
├── chat/                  # Chat module for handling conversations
├── prisma/                # Prisma database module
└── main.ts               # Application entry point
```

## Features

- 🤖 Interactive math chatbot functionality
- 💾 Database integration with Prisma ORM
- 🔧 Environment-based configuration
- 📝 TypeScript support
- 🧪 Comprehensive testing setup
- 🏗️ Modular architecture with NestJS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Database (PostgreSQL/MySQL/SQLite)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd math-chatbot-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your database connection and other configurations
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

### Running the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start:prod
```

#### Watch Mode
```bash
npm run start:debug
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

The API provides endpoints for:
- Chat interactions with the math bot
- User session management
- Mathematical problem solving

*API documentation will be available at `http://localhost:3000/api` when running the application.*

## Database Schema

The application uses Prisma ORM for database management. Run the following to explore your database:

```bash
npx prisma studio
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is created by @huotsokeng

---

For more information or support, please contact the development