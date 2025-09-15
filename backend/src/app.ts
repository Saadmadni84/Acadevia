import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Health check or root route
app.get('/', (_req: Request, res: Response) => {
  res.send('API is up and running!');
});

// Error handler (optional)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;

 
