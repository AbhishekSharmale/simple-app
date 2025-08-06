# Deployment Guide

## Quick Deploy Commands

### 1. Backend (Cloudflare Workers)
```bash
cd backend
npm install -g wrangler
wrangler login
wrangler kv:namespace create "CONTACTS_KV"
# Update wrangler.toml with the returned namespace ID
wrangler deploy
```

### 2. Frontend (Cloudflare Pages)
```bash
cd frontend/contact-app
npm install
ng build
# Upload dist/contact-app folder to Cloudflare Pages dashboard
```

## Environment Setup

### Backend Environment Variables
- No additional environment variables needed
- KV storage is configured in wrangler.toml

### Frontend Build Settings (Cloudflare Pages)
- **Build command**: `cd frontend/contact-app && npm install && ng build`
- **Build output directory**: `frontend/contact-app/dist/contact-app`
- **Root directory**: `/`

## Post-Deployment

1. Update frontend API URL in `app.ts` from `localhost:3000` to your Workers URL
2. Test the form submission
3. Check KV storage in Cloudflare dashboard

## Troubleshooting

- **CORS Issues**: Ensure Workers function includes proper CORS headers
- **Build Errors**: Check Node.js version compatibility
- **KV Storage**: Verify namespace binding in wrangler.toml