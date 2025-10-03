# FitKey 🏋️‍♂️

A robust fitness check-in API that allows users to check into gyms, track their fitness journey, and manage gym locations. Built with modern technologies for scalability and performance.

## 🚀 Features

-   **User Management**: Registration, authentication with JWT tokens
-   **Gym Management**: Create and search gyms, find nearby locations
-   **Check-in System**: Daily gym check-ins with location validation
-   **Metrics & History**: Track check-in statistics and history
-   **Role-based Access**: Admin and member roles with different permissions
-   **Validation**: Location-based check-in validation (within 100m of gym)
-   **Time Constraints**: Check-in validation within 20 minutes of creation

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Fastify
-   **Database**: PostgreSQL with Prisma ORM
-   **Authentication**: JWT with refresh tokens
-   **Validation**: Zod schemas
-   **Testing**: Vitest with supertest for E2E tests
-   **Language**: TypeScript

## 📋 Prerequisites

-   Node.js 18+
-   PostgreSQL database
-   npm or yarn

## 🔧 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd fitkey
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env
```

4. **Configure environment variables**

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="postgresql://username:password@localhost:5432/fitkey?schema=public"
JWT_SECRET="your-secret-key"
```

5. **Database setup**

```bash
# Start PostgreSQL (using Docker)
docker-compose up -d

# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## 🚀 Getting Started

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## 🧪 Testing

### Unit Tests

```bash
npm test
npm run test:watch  # Watch mode
```

### E2E Tests

```bash
npm run test:e2e
npm run test:e2e:watch  # Watch mode
```

### Test Coverage

```bash
npm run test:coverage
```

### Test UI

```bash
npm run test:ui
```

## 📚 API Documentation

### Authentication

#### Register User

```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login

```http
POST /sessions
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Refresh Token

```http
PATCH /token/refresh
Cookie: refreshToken=<refresh_token>
```

#### Get Profile

```http
GET /me
Authorization: Bearer <token>
```

### Gyms

#### Create Gym (Admin only)

```http
POST /gyms
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "FitKey Gym",
  "description": "Premium fitness center",
  "phone": "1199999999",
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

#### Search Gyms

```http
GET /gyms/search?q=FitKey&page=1
Authorization: Bearer <token>
```

#### Find Nearby Gyms

```http
GET /gyms/nearby?latitude=-23.5505&longitude=-46.6333
Authorization: Bearer <token>
```

### Check-ins

#### Create Check-in

```http
POST /gyms/{gymId}/check-ins
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": -23.5505,
  "longitude": -46.6333
}
```

#### Validate Check-in (Admin only)

```http
PATCH /check-ins/{checkInId}/validate
Authorization: Bearer <token>
```

#### Get Check-in History

```http
GET /check-ins/history?page=1
Authorization: Bearer <token>
```

#### Get Check-in Metrics

```http
GET /check-ins/metrics
Authorization: Bearer <token>
```

## 🏗️ Project Structure

```md
src/
├── @types/              # TypeScript declarations
├── app.ts              # Fastify app configuration
├── server.ts           # Server entry point
├── env/                # Environment configuration
├── http/               # HTTP layer
│   ├── controllers/    # Route controllers
│   │   ├── users/      # User-related endpoints
│   │   ├── gyms/       # Gym-related endpoints
│   │   └── check-ins/  # Check-in endpoints
│   └── middlewares/    # Custom middlewares
├── lib/                # External libraries setup
├── repositories/       # Data access layer
│   ├── in-memory/      # In-memory implementations (testing)
│   └── prisma/         # Prisma implementations
├── services/           # Business logic layer
│   ├── errors/         # Custom error classes
│   └── factories/      # Dependency injection factories
└── utils/              # Utility functions
```

## 🔐 Authentication & Authorization

The API uses JWT tokens for authentication with refresh token support:

-   **Access Token**: Short-lived (10 minutes) for API requests
-   **Refresh Token**: Long-lived (7 days) stored in HTTP-only cookies
-   **Roles**: `ADMIN` and `MEMBER` with different permissions

### Protected Routes

-   All gym and check-in routes require authentication
-   Admin routes: gym creation, check-in validation

## 📊 Business Rules

### Check-ins

-   Users can only check-in once per day per gym
-   Check-ins must be within 100 meters of the gym location
-   Check-ins can only be validated within 20 minutes of creation
-   Only admins can validate check-ins

### Gyms

-   Only admins can create new gyms
-   Gym search supports pagination (20 items per page)
-   Nearby search finds gyms within 10km radius

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
    "message": "Error description",
    "issues": {} // Validation errors (if applicable)
}
```

Common HTTP status codes:

-   `400`: Bad Request (validation errors)
-   `401`: Unauthorized
-   `404`: Resource not found
-   `409`: Conflict (e.g., user already exists)
-   `500`: Internal server error

## 🧩 Database Schema

### Users

-   `id`: UUID primary key
-   `name`: User's full name
-   `email`: Unique email address
-   `password_hash`: Bcrypt hashed password
-   `role`: ADMIN or MEMBER
-   `created_at`: Registration timestamp

### Gyms

-   `id`: UUID primary key
-   `title`: Gym name
-   `description`: Optional description
-   `phone`: Optional contact number
-   `latitude/longitude`: GPS coordinates

### Check-ins

-   `id`: UUID primary key
-   `user_id`: Foreign key to users
-   `gym_id`: Foreign key to gyms
-   `created_at`: Check-in timestamp
-   `validated_at`: Optional validation timestamp

## 🚀 Deployment

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3333
DATABASE_URL="your-production-database-url"
JWT_SECRET="strong-production-secret"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

-   Write tests for new features
-   Follow TypeScript best practices
-   Use conventional commit messages
-   Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

-   **Lucas** - Initial work

## 🙏 Acknowledgments

-   Built with [Fastify](https://www.fastify.io/)
-   Database management with [Prisma](https://www.prisma.io/)
-   Testing with [Vitest](https://vitest.dev/)
