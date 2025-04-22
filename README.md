# Apple Client Secret Generator

A simple Node.js script to generate an Apple Client Secret (JWT) for “Sign in with Apple” integrations.

## Features

- Reads configuration from environment files (`.env.development.local`, `.env.production.local`)
- Generates a signed JWT (ES256) valid for 180 days
- Prints out the `APPLE_CLIENT_ID` and `APPLE_CLIENT_SECRET` for easy copy‑pasting

## Prerequisites

- Node.js (v14+)
- Yarn
- An Apple Developer account with:
  - **Client ID** (`APPLE_CLIENT_ID`)
  - **Team ID** (`APPLE_TEAM_ID`)
  - **Key ID** (`APPLE_KEY_ID`)
  - A private key file (`.p8`) downloaded from Apple

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Acateel/apple-generate-token
   cd apple-generate-token
   ```

2. **Install dependencies**  
   ```bash
   yarn
   ```

## Configuration

1. **Create environment files** in the project root:

   - `.env.development.local`
   - `.env.production.local`

2. **Populate each** with the following variables:

   ```dotenv
   APPLE_CLIENT_ID=com.example.apple.signin
   APPLE_TEAM_ID=YOUR_TEAM_ID
   APPLE_KEY_ID=YOUR_KEY_ID
   APPLE_PRIVATE_KEY_PATH=./keys/AuthKey_XXXXXXXXXX.p8
   ```

   The script will exit with an error if any of these are missing.

3. **Place your private key** (`AuthKey_*.p8`) into a folder named `keys/` at the project root.

   ```
   apple-generate-token/
   ├── keys/
   │   └── AuthKey_ABCD1234E.p8
   ├── index.js
   ├── util.js
   ├── package.json
   └── …
   ```

## Usage

Two helper scripts are provided in `package.json`:

- **Development** (uses `.env.development.local`):  
  ```bash
  yarn generate:dev
  ```

- **Production** (uses `.env.production.local`):  
  ```bash
  yarn generate:prod
  ```

Under the hood, both commands run:
```bash
node ./index.js
```
and will output something like:  
```
Apple client secret generated. Valid until: 2025‑10‑19T12:34:56.000Z
APPLE_CLIENT_ID="com.example.apple.signin"
APPLE_CLIENT_SECRET="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il..."
```

