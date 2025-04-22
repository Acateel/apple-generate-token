import dotenv from "dotenv"

dotenv.config()

const requiresVars = [
    "APPLE_PRIVATE_KEY_PATH",
    "APPLE_TEAM_ID",
    "APPLE_CLIENT_ID",
    "APPLE_KEY_ID"
]

export function getVariables() {
    const missing = requiresVars.filter(name => !process.env[name])

    if (missing.length > 0) {
        console.error(`In env file dont found vars: ${missing.join(', ')}`)
        process.exit(1);
    }

    return {
        team_id: process.env.APPLE_TEAM_ID,
        private_key_path: process.env.APPLE_PRIVATE_KEY_PATH,
        client_id: process.env.APPLE_CLIENT_ID,
        key_id: process.env.APPLE_KEY_ID
    }
}