# 🩸 Drop4Life Backend API

Spring Boot 3.3.4 REST API for the Drop4Life blood donation platform.

## Requirements
- Java 21 or Java 22
- PostgreSQL 16 (or run `docker-compose up -d` in project root)

## Configuration
Database connection is set in `src/main/resources/application.yml`:
- URL: `jdbc:postgresql://localhost:5432/drop4life`
- Username: `drop4life`
- Password: `drop4life_secret`

## Running the Application
```bash
mvn spring-boot:run
```
Or build the JAR:
```bash
mvn clean package -DskipTests
java -jar target/drop4life-api-2.0.0.jar
```

The server starts at `http://localhost:8080`.

## Seed Accounts (for testing)
- **Admin**: `admin@drop4life.com` / `Password@123`
- **Donor (B+)**: `rahul.sharma@gmail.com` / `Password@123`
- **Donor (O-)**: `priya.patel@gmail.com` / `Password@123`
- **Requester**: `sunita.gupta@gmail.com` / `Password@123`

## Key Endpoints
- `POST /api/auth/register` - Register with full medical validations
- `POST /api/auth/login` - Login with JWT & refresh token
- `GET /api/blood-requests` - Active blood requests with urgency levels
- `POST /api/blood-requests` - Create request (with 10-min anti-spam check)
- `GET /api/donors/match` - Smart donor matching with auto-expanding radius
- `POST /api/donations` - Record completed donation and update cooldown
- `GET /api/hospitals` - Hospital list and blood bank inventory
- `GET /api/admin/dashboard` - Platform statistics & analytics
- `WS /ws` - WebSocket STOMP endpoint for real-time alerts
