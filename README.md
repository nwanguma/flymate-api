# FlyMate 🛫

**FlyMate** is your ultimate travel companion app, designed to simplify trip planning, flight tracking, and travel management. Whether you're a frequent flyer or planning your dream vacation, FlyMate provides personalized tools to make your journey smooth and enjoyable.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Core Functionalities

- **User Profiles:** Create and manage personalized profiles with travel preferences.
- **Flight Tracking:** Real-time flight status updates and alerts.
- **Trip Planning:** Organize and save upcoming trips, itineraries, and important travel details.
- **Notifications:** Stay updated with trip reminders, flight changes, and travel tips.
- **Saved Flights:** Bookmark flights for future reference.

### Integrations

- **Amadeus API:** Retrieve flight data and manage travel bookings.

---

## Getting Started

### Prerequisites

- **Node.js** (v16+)
- **Docker** (optional for local setup)
- **TypeScript**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nwanguma/flymate-api.git
   cd flymate-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**
   Ensure PostgreSQL or your preferred DBMS is running and configure `.env` with correct settings.

4. **Run migrations:**

   ```bash
   npm run typeorm migration:run
   ```

5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

---

## Project Structure

```
flymate/
├── src/
│   ├── core/
│   │   ├── auth/                # Authentication module
│   │   ├── destinations/        # Destination management
│   │   ├── flights/             # Flight-related logic
│   │   ├── hotels/              # Hotel-related logic
│   │   ├── notifications/       # Notification service
│   │   ├── profiles/            # User profiles
│   │   ├── trips/               # Trip management
│   │   ├── users/               # User management
│   │
│   ├── common/                  # Shared modules and utilities
│   │   ├── classes/             # Custom classes
│   │   ├── config/              # Configuration settings
│   │   ├── constants/           # Application-wide constants
│   │   ├── decorators/          # Custom decorators
│   │   ├── filters/             # Exception filters
│   │   ├── interceptors/        # Request/response interceptors
│   │   ├── middleware/          # Custom middleware
│   │
│   ├── utils/                   # Utility functions
│   │   ├── file-uploads/        # File upload utilities
│   │   ├── cache/               # Caching utilities
│   │
│   ├── integrations/            # Third-party service integrations
│   │   ├── amadeus/             # Amadeus API integration for flights
│   │   ├── mailjet/             # Mailjet API integration for emails
│
├── main.ts                      # Application entry point
├── app.module.ts                # Root module
├── test/                        # Testing setup and files
├── .env                         # Environment variables file
└── README.md                    # Project documentation
```

---

## Technologies Used

- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL, TypeORM
- **API Integration:** Amadeus API
- **Documentation:** Swagger (OpenAPI)

---

## Environment Configuration

Create a `.env.environment` file at the project root with the example in `example.env`:

---

## API Documentation

FlyMate uses **Swagger** for documenting the REST API:

1. **Start the server**: Ensure the server is running locally.
2. **Access Swagger UI**: Open `http://localhost:PORT/api-docs`.

---

## Testing

FlyMate uses Jest and React Testing Library for unit and integration tests.

**Run tests:**

```bash
npm run test
```

---

## License

[MIT](LICENSE)

---

## Contact

For questions, feedback, or suggestions, please reach out via [email](mailto:nwangumat@gmail.com) or submit an issue.

---

Happy travels with FlyMate! ✈️
