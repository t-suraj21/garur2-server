# Garur2 Server

A robust backend server for the Garur2 educational platform, providing APIs for user management, study progress tracking, and test performance monitoring.

## Features

- **User Management**
  - User registration and authentication
  - Profile management
  - Secure password handling with bcrypt
  - JWT-based authentication

- **Study Progress Tracking**
  - Chapter completion tracking
  - Study time monitoring
  - Progress statistics
  - Study history

- **Test Performance**
  - Test result recording
  - Performance analytics
  - Test history
  - Ranking system

- **Activity Monitoring**
  - Recent activity tracking
  - Study session logging
  - Last active status
  - Performance metrics

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd garur2-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`

### User Profile

- `GET /api/users/profile` - Get user profile
  - Headers: `Authorization: Bearer <token>`

- `PUT /api/users/profile` - Update user profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, email, phone, location, class, bio }`

### Study Progress

- `POST /api/users/progress` - Update study progress
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ chapterId, chapterName, subject, timeSpent }`

- `GET /api/users/study-history` - Get study history
  - Headers: `Authorization: Bearer <token>`

### Test Results

- `POST /api/users/test-results` - Record test results
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ testId, testName, subject, score, timeTaken }`

- `GET /api/users/test-history` - Get test history
  - Headers: `Authorization: Bearer <token>`

## Data Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  location: String,
  class: String,
  bio: String,
  completedChapters: Number,
  totalChapters: Number,
  completedTests: Number,
  averageScore: Number,
  totalStudyTime: Number,
  rank: Number,
  readBooks: Number,
  lastLogin: Date,
  lastActivity: Date,
  studyHistory: [{
    chapterId: String,
    chapterName: String,
    subject: String,
    completedAt: Date,
    timeSpent: Number
  }],
  testHistory: [{
    testId: String,
    testName: String,
    subject: String,
    score: Number,
    completedAt: Date,
    timeTaken: Number
  }]
}
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes using middleware
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.