# 🏠 Basha Finder - Backend

Basha Finder is a rental platform backend that connects **tenants** with **landlords**. This backend handles user authentication, role-based access control, listing management, rental requests, and more.

---

## 🚀 Features

- 🔐 JWT Authentication with role-based access (Admin, Landlord, Tenant)
- 🏘️ CRUD operations for rental house listings
- 📩 Rental request system between tenants and landlords
- 🔍 Advanced filtering and search (location, rent, bedrooms)
- 📧 Email notifications on rental request updates
- 🛡️ Admin moderation for listings and user roles
- 🔒 Passwords hashed with bcrypt

---

## 🧱 Database Collections (MongoDB)

### 1. `Users` Collection
| Field | Description |
|-------|-------------|
| name | User's full name |
| email | Unique email address |
| phone | Contact number |
| password | Hashed password |
| role | One of: `admin`, `landlord`, `tenant` |
| ... | Additional profile info |

### 2. `Listings` Collection
| Field | Description |
|-------|-------------|
| location | Rental house location |
| description | Details of the house |
| rent | Monthly rent |
| bedrooms | Number of bedrooms |
| images | Array of image URLs |
| landlordId | Reference to the landlord user |
| ... | Other metadata |

### 3. `Requests` Collection
| Field | Description |
|-------|-------------|
| listingId | Reference to the rental listing |
| tenantId | Reference to the requesting user |
| status | `pending`, `approved`, `rejected` |
| message | Message from tenant (e.g. move-in date, duration, etc.) |
| paymentStatus | For approved requests |
| landlordPhone | Entered by landlord upon approval |

---



---

## 🔑 Authentication

- JWT used for session management.
- bcrypt used for password hashing.
- Role-based middleware for:
  - `/admin` (Admin only)
  - `/landlords` (Landlord only)
  - `/tenants` (Tenant only)

---

## 📬 API Endpoints

### 🔹 Tenant Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /tenants/requests       | Create a rental request |
| GET    | /tenants/requests       | View tenant's rental requests |
| PUT    | /tenants/profile        | Update tenant profile |

### 🔹 Landlord Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /landlords/listings       | Create new rental listing |
| GET    | /landlords/listings       | Get all listings by landlord |
| PUT    | /landlords/listings/:id   | Update a listing |
| DELETE | /landlords/listings/:id   | Delete a listing |
| GET    | /landlords/requests       | View rental requests to their listings |
| PUT    | /landlords/requests/:id   | Approve or reject a request and enter phone number on approval |

### 🔹 Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /admin/users             | Get all users |
| PUT    | /admin/users/:id         | Update user roles |
| DELETE | /admin/users/:id         | Delete a user |
| GET    | /admin/listings          | View all listings |
| PUT    | /admin/listings/:id      | Moderate a listing |
| DELETE | /admin/listings/:id      | Remove a listing |

---

## 🔍 Search & Filter

- Location-based search
- Rent range filtering
- Bedroom count filter

Example:




# Setup and Installation

## Clone the Repository

```bash
git clone https://github.com/username/bike-store-api.git
cd bike-store-api

```

## Install Dependencies

```bash
git clone https://github.com/username/bike-store-api.git
cd bike-store-api

```

### Create a .env File

Add a `.env` file in the root directory with the following content:

```bash

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bike-store

```

### Start the Server

To start the server in development mode, use the following command:

```bash

npm run start:dev


```

## Test the API
You can test the API using tools like Postman or cURL.

# Technologies Used
- Node.js and Express.js
- TypeScript
- MongoDB with Mongoose

