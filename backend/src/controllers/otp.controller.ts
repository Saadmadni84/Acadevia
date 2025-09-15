import { Request, Response } from 'express'

export async function sendOTP(req: Request, res: Response) {
  res.json({ message: 'OTP sent' })
}

export async function verifyOTP(req: Request, res: Response) {
  res.json({ message: 'OTP verified' })
}
