# Car Rental Admin Dashboard

A secure administration dashboard built with React for managing a car rental business. The dashboard provides authenticated access to manage vehicles, reservations, customers, and invoices through a clean and responsive interface.

## Features

- Secure authentication
- Protected routes
- Dashboard overview
- Vehicle management (CRUD)
- Reservation management
- Customer management
- Invoice management
- Status updates


## Tech Stack

- React
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Context API
- Vite

## Backend

This dashboard communicates with a PHP REST API using session-based authentication and HTTP cookies.

## Project Structure

```
src/
├── assets/
├── components/
├── context/
├── layouts/
├── pages/
├── services/
├── hooks/
└── App.jsx
```

## Installation

```bash
git clone <repository-url>
cd dashboard
npm install
npm run dev
```

## Environment Variables

Create a `.env.development` file:

```env
VITE_API_URL=http://localhost/car-rental-api
```

## Build

```bash
npm run build
```

## Authentication

- PHP Sessions
- HttpOnly Cookies
- Protected Routes
- Persistent Login
- Session Validation

## Author

**Mohamed Amine Nafia**
