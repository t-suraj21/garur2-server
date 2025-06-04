import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  classId: String,
  subject: String,
  chapterId: String,
  questions: [
    {
      question: String,
    },
  ],
});

export default mongoose.model('Test', testSchema);
