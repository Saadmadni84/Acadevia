import { Request, Response } from 'express'

export async function uploadFile(req: Request, res: Response) {
  res.json({ message: 'File uploaded' })
}
