import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// routes

// GET /notes
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// GET /notes/:noteId
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// GET /test-error
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// 500 middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});