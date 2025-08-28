import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Load environment variables with explicit path FIRST
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Validate MONGODB_URI EARLY
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

const MONGODB_URI = process.env.MONGODB_URI as string;

// Connect to MongoDB BEFORE importing routes that use models
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process if DB connection fails
    });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes AFTER MongoDB connection is established
import productRoutes from './routes/productRoutes';

// Use routes
app.use('/api/products', productRoutes);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});