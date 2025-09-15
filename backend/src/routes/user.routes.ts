import { Router, Request, Response } from 'express';

const router = Router();

// Example GET endpoint
router.get('/', (req: Request, res: Response) => {
  res.json({ message: "User list endpoint working." });
});

// Example POST endpoint
router.post('/', (req: Request, res: Response) => {
  const userData = req.body;
  // Logic to add user can go here
  res.json({ message: "User added!", user: userData });
});

export default router;