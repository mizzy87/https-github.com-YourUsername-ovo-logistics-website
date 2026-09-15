# OVO Logistics Website

A logistics management website with database integration for tracking shipments and managing customers.

## Features

- **Shipment Tracking**: Track shipments with real-time status updates
- **Customer Management**: Manage customer profiles and their shipments
- **RESTful API**: Complete API for shipment and customer operations
- **MongoDB Database**: Persistent data storage with MongoDB

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas URI)
- npm or yarn

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ovo-logistics-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI:
   ```
   MONGO_URI=mongodb://localhost:27017/ovo-logistics
   PORT=5000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Shipments
- `GET /api/shipments` - Get all shipments
- `GET /api/shipments/:trackingNumber` - Get shipment by tracking number
- `POST /api/shipments` - Create a new shipment
- `PUT /api/shipments/:id` - Update a shipment
- `DELETE /api/shipments/:id` - Delete a shipment

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

## Sample API Usage

### Create a Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "ABC Corp"
  }'
```

### Create a Shipment
```bash
curl -X POST http://localhost:5000/api/shipments \
  -H "Content-Type: application/json" \
  -d '{
    "trackingNumber": "TRACK123456",
    "customerId": "<customer_id>",
    "origin": {
      "address": "123 Main St",
      "city": "New York",
      "country": "USA"
    },
    "destination": {
      "address": "456 Oak Ave",
      "city": "Los Angeles",
      "country": "USA"
    },
    "status": "pending",
    "shippingMethod": "express",
    "cost": 99.99
  }'
```

## Database Schema

### Customer
- `name`: String (required)
- `email`: String (required, unique)
- `phone`: String
- `company`: String
- `address`: Object (street, city, state, country, zipCode)
- `shipments`: Array of Shipment IDs
- `createdAt`: Date
- `updatedAt`: Date

### Shipment
- `trackingNumber`: String (required, unique)
- `customerId`: Reference to Customer
- `origin`: Object (address, city, country, zipCode)
- `destination`: Object (address, city, country, zipCode)
- `status`: Enum (pending, in_transit, delivered, delayed, cancelled)
- `weight`: Object (value, unit)
- `dimensions`: Object (length, width, height, unit)
- `shippingMethod`: Enum (standard, express, overnight)
- `cost`: Number
- `estimatedDelivery`: Date
- `actualDelivery`: Date
- `notes`: String

## Project Structure

```
.
├── server.js              # Main application file
├── package.json           # Project dependencies
├── .env.example           # Environment variables template
├── config/
│   └── database.js        # Database configuration
├── models/
│   ├── Customer.js        # Customer schema
│   └── Shipment.js        # Shipment schema
└── routes/
    ├── customers.js       # Customer API routes
    └── shipments.js       # Shipment API routes
```

## License

ISC
