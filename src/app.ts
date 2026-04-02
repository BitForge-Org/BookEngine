import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import * as morgan from './config/morgan';
import { errorHandler, notFoundHandler } from './common/middlewares/errorHandler';
import routes from './router';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());
app.options(/.*/, cors());

// Parse JSON request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Gzip compression
app.use(compression());

// Request rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

// Enable if needed
// app.use(limiter);

// Swagger
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health route
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
  });
});

// API routes
app.use('/api/v1', routes);

// Handle unknown routes
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;