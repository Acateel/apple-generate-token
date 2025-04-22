import { createPrivateKey } from 'crypto'
import fs from 'fs'
import { SignJWT } from 'jose'
import path from 'path'

import { getVariables } from './util.js'

const { client_id, private_key_path, key_id, team_id } = getVariables()

const privateKey = fs.readFileSync(path.resolve(private_key_path), 'utf8')

const expires_in = 86400 * 180
const expirationTime = Math.ceil(Date.now() / 1000) + expires_in

const secret = await new SignJWT({})
  .setAudience('https://appleid.apple.com')
  .setIssuer(team_id)
  .setIssuedAt()
  .setExpirationTime(expirationTime)
  .setSubject(client_id)
  .setProtectedHeader({ alg: 'ES256', kid: key_id })
  .sign(createPrivateKey(privateKey.replace(/\\n/g, '\n')))


console.log(`Apple client secret generated. Valid until: ${new Date(expirationTime * 1000)}`)
console.log(`APPLE_CLIENT_ID="${client_id}"`)
console.log(`APPLE_CLIENT_SECRET"${secret}"`)

