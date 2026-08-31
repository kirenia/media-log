# media-log

The React Native front end for [cyberpunk-library](https://github.com/kirenia/cyberpunk-library) —
a media log for tracking what you're reading, watching, playing. Built by Kire for WDV463.

## Running it

```
npm install
npm start
```

Then scan the QR code with Expo Go, or press `i` / `a` for a simulator.

The API URL comes from `EXPO_PUBLIC_API_URL` in `.env`, which is committed and
already points at the deployed Heroku API — so it runs as-is. To develop against
a local API instead, drop a `.env.local` next to it:

```
EXPO_PUBLIC_API_URL=http://localhost:8000
```

## Auth

- **Register** and **Log In** screens are the only routes that exist while logged out.
- On success the API returns a JWT, stored with `expo-secure-store` on device
  (`localStorage` on web, since SecureStore is native only).
- The token is sent as `Authorization: Bearer <token>` on every `/books` request.
- **Library** and **Log Media** are only mounted in the navigator once a token is
  present, so there's no route to reach them unauthenticated.
- On launch the stored token is checked against `GET /auth/me`; expired or revoked
  tokens are cleared and you land back on the login screen.
- Each account only ever sees its own logged media.
