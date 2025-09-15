import { Request, Response } from 'express'

export async function createPayment(req: Request, res: Response) {
  res.json({ message: 'Payment created' })
}

export async function verifyPayment(req: Request, res: Response) {
  res.json({ message: 'Payment verified' })
}
