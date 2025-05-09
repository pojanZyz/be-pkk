import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {db} from './src/config/database.js';
import './src/models/index.js'; // Import models to ensure they are registered
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// router
import router from './src/routes/app.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(
    cors({
      origin: "*", // Allows requests from all domains
      methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH", // Allowed methods
      allowedHeaders: "Content-Type, Authorization, X-Requested-With", // Allowed headers
      credentials: true, // If you need cookies to be included in requests
    })
  );
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));

const initializeDatabase = async () => {
    try {
        await db.authenticate();
        await db.sync({ alter: true });
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
initializeDatabase();
app.use(express.json());
app.use(
    cors({
      origin: "*", // Allows requests from all domains
      methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH", // Allowed methods
      allowedHeaders: "Content-Type, Authorization, X-Requested-With", // Allowed headers
      credentials: true, // If you need cookies to be included in requests
    })
  );
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error occurred:", err);
    res.status(err.status || 500).json({
      error: {
        message: err.message || "Internal Server Error",
      },
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});