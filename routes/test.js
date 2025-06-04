import express from 'express';
import { getTest } from '../controllers/testController.js';

const router = express.Router();

router.get('/start/:classId/:subject/:chapterId', getTest);

export default router;
