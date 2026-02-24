<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# TaskManagementSystem

This repository contains a NestJS-based Task Management API with users and tasks, filtering, pagination and analytics.

## Quickstart

Prerequisites:

- `Node.js` (v18+ recommended)
- `yarn` or `npm`
- (Optional) `Docker` and `Docker Compose` to run Postgres via containers

1. Clone the repository and change into the project folder:

```bash
git clone <repo-url>
cd backend-challenge
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Create a `.env` file in the project root with the following variables (example):

```env
# HTTP port the app listens on
API_PORT=3001

# Postgres connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=TaskManager
DB_USER=postgres
DB_PASSWORD=secretPass
DB_SYNCHRONIZE=false
```

4. Start the database:

- Using Docker Compose:

```bash
docker-compose up -d
# View logs:
docker-compose logs -f
```

- Or ensure you have a PostgreSQL instance running and reachable using the `.env` credentials.

5. Run database migrations to set up the schema:

```bash
yarn typeorm:migration:generate
yarn typeorm:migration:run
# or
npm run typeorm:migration:run
```

6. Run the application:

- Development (auto-reload):

```bash
yarn start:dev
# or
npm run start:dev
```

- Production (build then run):

```bash
yarn build
yarn start:prod
# or
npm run build
npm run start:prod
```

## API & Swagger

The app mounts the Swagger UI at the API root. Once the server is running, open the API docs in your browser at:

```
http://localhost:<API_PORT>/api
```

Replace `<API_PORT>` with the value from your `.env` (default shown above is `3001`).

Examples of endpoints (all are prefixed with `/api`):

- `GET /api/tasks` — list tasks (pagination & filters)
- `POST /api/tasks` — create a task
- `GET /api/tasks/analytics` — analytics summary
- `GET /api/users` — list users
- `POST /api/users` — create user

Use the Swagger UI to see request/response schemas and try endpoints interactively.

## Environment / Database notes

- If the app cannot connect to the database, verify the `.env` values and that Postgres is running and reachable from the host where you run the app.
- Default Postgres port is `5432`. If you already have a local Postgres instance, pick unique DB name and credentials to avoid conflicts.

## Troubleshooting

- Port in use: change `API_PORT` in `.env`.
- DB connection refused: ensure Postgres is running and `.env` credentials match the DB.
- If using Docker, check `docker-compose logs` for container errors.

## Description

### Analytics endpoint

`GET /api/tasks/analytics` returns statistics for tasks:

- `total`: total number of non-deleted tasks
- `statusCounts`: object mapping task statuses to counts

Use Swagger to explore full API surface and sample requests.




