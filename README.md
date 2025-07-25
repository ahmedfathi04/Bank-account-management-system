# Bank Account Management System (BAMS)

A Node.js/Express API for managing bank accounts with MongoDB.

## Quick Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation OR MongoDB Atlas account)

### Installation

```bash
npm install
```

## Database Setup Options

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB locally:**

   - **Windows**: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/administration/install-community/)

2. **Start MongoDB:**

   ```bash
   # Windows (run as administrator)
   net start MongoDB

   # macOS/Linux
   brew services start mongodb-community
   # OR
   sudo systemctl start mongod

   # Manual start (any OS)
   mongod --dbpath /path/to/your/data/directory
   ```

3. **Run the application:**
   ```bash
   npm run run:div
   ```

### Option 2: MongoDB Atlas (Cloud Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Set environment variable:

   ```bash
   # Windows
   set MONGODB_URI=your_mongodb_atlas_connection_string

   # macOS/Linux
   export MONGODB_URI=your_mongodb_atlas_connection_string
   ```

5. Run the application:
   ```bash
   npm run run:div
   ```

## Troubleshooting MongoDB Connection Issues

If you see `MongooseError: Operation 'users.insertOne()' buffering timed out`:

1. **Check if MongoDB is running:**

   ```bash
   # Check if MongoDB process is running
   # Windows
   tasklist | findstr mongod

   # macOS/Linux
   ps aux | grep mongod
   ```

2. **Test MongoDB connection:**

   ```bash
   # Try connecting with MongoDB shell
   mongosh mongodb://127.0.0.1:27017/bams_app
   ```

3. **Check port availability:**

   ```bash
   # Windows
   netstat -an | findstr :27017

   # macOS/Linux
   netstat -an | grep :27017
   ```

4. **Firewall/Antivirus**: Ensure MongoDB port (27017) is not blocked

## API Endpoints

- `GET /` - View all users
- `GET /:accountId` - Show balance inquiry
- `POST /` - Create new user
- `PUT /:accountId/deposit` - Deposit money
- `PUT /:accountId/withdraw` - Withdraw money
- `POST /transfer` - Transfer money between accounts
- `DELETE /:accountId` - Delete user account

## Recent Fixes

✅ **Fixed MongoDB connection timeout issues:**

- Added proper connection options
- Reduced timeout to 5 seconds for faster feedback
- Added environment variable support for custom connection strings
- Added helpful error messages and troubleshooting tips

✅ **Fixed transfer function bug:**

- Corrected variable reference from `account.balance` to `sender.balance`
- Added proper validation for transfer amounts
- Added checks for sender/receiver existence
- Added insufficient balance validation

✅ **Added comprehensive error handling:**

- Try-catch blocks for all controller functions
- Proper HTTP status codes
- Descriptive error messages
- Input validation

## Environment Variables

- `MONGODB_URI` - Custom MongoDB connection string (optional)

## Development

```bash
# Start development server with nodemon
npm run run:div
```

The server will start on port 3000: http://localhost:3000
