import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  class: { type: String },
  bio: { type: String, default: 'Passionate student dedicated to academic excellence and continuous learning.' },
  
  // Study Progress
  completedChapters: { type: Number, default: 0 },
  totalChapters: { type: Number, default: 0 },
  completedTests: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  totalStudyTime: { type: Number, default: 0 }, // in minutes
  rank: { type: Number, default: 0 },
  readBooks: { type: Number, default: 0 },
  
  // Activity Tracking
  lastLogin: { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  
  // Study History
  studyHistory: [{
    chapterId: String,
    chapterName: String,
    subject: String,
    completedAt: Date,
    timeSpent: Number // in minutes
  }],
  
  // Test History
  testHistory: [{
    testId: String,
    testName: String,
    subject: String,
    score: Number,
    completedAt: Date,
    timeTaken: Number // in minutes
  }]
});

const User = mongoose.model('User', userSchema);
export default User;
