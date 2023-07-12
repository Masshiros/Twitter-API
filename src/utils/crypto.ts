import { createHash } from 'crypto'
import { config } from 'dotenv'
config()
// sha256 hash func
function SHA256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

export function hashPassword(password: string) {
  return SHA256(password + process.env.PASSWORD_SECRET)
}
