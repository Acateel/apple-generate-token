import { createPrivateKey } from 'crypto'
import fs from 'fs'
import { SignJWT } from 'jose'
import path from 'path'
import dotenv from "dotenv"

dotenv.config()

const privateKey = fs.readFileSync(path.resolve(process.env.APPLE_PRIVATE_KEY_PATH), 'utf8')

const team_id = process.env.APPLE_TEAM_ID,
  iss = team_id,
  private_key = privateKey,
  client_id = process.env.APPLE_CLIENT_ID,
  sub = client_id,
  key_id = process.env.APPLE_KEY_ID,
  kid = key_id,
  expires_in = 86400 * 180,
  exp = Math.ceil(Date.now() / 1000) + expires_in

const expiresAt = Math.ceil(Date.now() / 1000) + expires_in
const expirationTime = exp ?? expiresAt

const secret = await new SignJWT({})
  .setAudience('https://appleid.apple.com')
  .setIssuer(iss)
  .setIssuedAt()
  .setExpirationTime(expirationTime)
  .setSubject(sub)
  .setProtectedHeader({ alg: 'ES256', kid })
  .sign(createPrivateKey(private_key.replace(/\\n/g, '\n')))

console.log(`
Apple client secret generated. Valid until: ${new Date(expirationTime * 1000)}
${secret}`)
