# EVENT Backend API

The API backend for event management system (ACARA) built using Node.js, Express, and MongoDB.

## Main Features

- Authentication & Account Activation (JWT, Email)
- Event, Ticket, Banner, Category Management
- Ticket Payment & Payment Gateway (Midtrans)
- Media Upload (Cloudinary)
- Wilayah Management (Province, City, District, Village)
- API Documentation (Swagger UI)

## Project Structure

```
.env
.env.example
package.json
src/
  app.ts
  features/
  middlewares/
  models/
  config/
  utils/
  docs/
  constants/
```

## Installation

1. Clone this repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill the variables as needed
4. Generate SECRET:
   ```sh
   ts-node secret.ts
   ```
   Insert the result into `.env`

## Running Server

```sh
npm run dev
```

Server runs at `http://localhost:3000`

## API Documentation

Swagger UI available at:  
`http://localhost:3000/api-docs`

## Testing API

Use tools like Postman or Swagger UI.

## Deployment

Configuration [vercel.json](vercel.json) is available for deployment to Vercel.

## Environment Configuration

See and adjust the [.env.example](.env.example) file for database, email SMTP, Cloudinary, and Midtrans configuration.
