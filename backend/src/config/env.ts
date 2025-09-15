import dotenv from 'dotenv'

dotenv.config()

function getEnv(key: string, required = true): string {
  const value = process.env[key]
  if (required && !value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value as string
}

export default getEnv
