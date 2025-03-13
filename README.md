# Node.js E-Commerce Backend

## Overview

This backend-only application is designed to provide a robust foundation for an e-commerce platform. It includes user authentication, role-based access control, and product management functionalities. Users can register, log in, update their profiles, and manage a shopping cart. Merchants can add and update products. The backend follows REST API principles and integrates with MongoDB as the database. While the current version is backend-focused, future enhancements will include an EJS-based frontend.

## Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB  
- Authentication: JWT (JSON Web Tokens)  
- Role-Based Access Control: Middleware implementation  
- Environment Management: Dotenv  

## Getting Started

### Prerequisites

Before installing and running this application, ensure you have the following installed on your system:

- Node.js (v16 or higher)  
- MongoDB (local instance or cloud-hosted service like MongoDB Atlas)  
- Git (optional, for cloning the repository)  
- A compatible operating system (Windows, macOS, or Linux)

### Installation Instructions

1. Clone the repository using the following command: git clone https://github.com/yourusername/ecommerce-backend.git
2. cd ecommerce-backend
3. Install the required dependencies - npm install
4. Create a .env file in the root directory and configure it with the following variables
      PORT=3000
      MONGODB_URI=mongodb://localhost:27017/ecommerce
      JWT_SECRET=your_jwt_secret_key
5. Start the MongoDB server if using a local instance:mongod

### Running the Application 
npm start

## API Endpoints

### Authentication

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | /api/users/register    | Register a new user             |
| POST   | /api/users/login       | Log in an existing user         |

### User Management

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /api/users/profile     | Retrieve the user's profile     |
| PUT    | /api/users/profile     | Update the user's profile       |
| POST   | /api/users/send-otp    | Send OTP for resetting password |
| PUT    |/api/users/reset-password | Reset the user's password     |

### Product Management (Merchant Only)

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | /api/products          | Add a new product               |
| PUT    | /api/products/:id      | Update an existing product      |

### Cart Functionalities

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | /api/cart/add          | Add a product to the cart       |
| GET    | /api/cart              | Retrieve the user's cart        |

## Help and Troubleshooting

### Common Issues and Solutions

- Database connection error: Ensure MongoDB is running and the MONGODB_URI in the .env file is correct.
- Missing environment variables: Verify that all required variables are defined in the .env file.
- Dependency issues: Run the following command to check and fix dependency problems:
      npm install --force
  
## Future Enhancements

- Implement inventory management to track product stock levels.
- Integrate Secure OTP functionality 
- Develop order processing and payment integration.
- Build an EJS-based frontend for seamless user interaction.
- Optimize API performance and implement caching strategies.

---

## Author

Developed by Navneet Mahajan . For more information, visit my GitHub profile: [GitHub Profile](https://github.com/Navneet-Mahajan)
