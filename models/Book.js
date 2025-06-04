import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  classId: String,
  subject: String,
  chapterId: String,
  content: String,
});

export default mongoose.model('Book', bookSchema);
