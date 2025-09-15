import { Request, Response } from 'express'

export async function getProfile(req: Request, res: Response) {
  res.json({ message: 'Get user profile' })
}

export async function updateProfile(req: Request, res: Response) {
  res.json({ message: 'Update user profile' })
}
