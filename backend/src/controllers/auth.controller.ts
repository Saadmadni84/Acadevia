import { Request, Response } from 'express'

export async function login(req: Request, res: Response) {
  res.json({ message: 'Login endpoint' })
}

export async function register(req: Request, res: Response) {
  res.json({ message: 'Register endpoint' })
}
