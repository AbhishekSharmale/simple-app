# Contact Form WebApp

A modern contact form application with Node.js backend and Angular frontend, designed for Cloudflare deployment.

## Features

- ✨ Sleek, animated UI with gradient backgrounds
- 📱 Responsive design for all devices
- ✅ Form validation with real-time feedback
- 🚀 Fast and secure data storage
- ☁️ Cloudflare deployment ready

## Project Structure

```
webapp-project/
├── backend/
│   ├── server.js          # Local development server
│   ├── _functions.js      # Cloudflare Workers function
│   ├── wrangler.toml      # Cloudflare Workers config
│   └── package.json
└── frontend/
    └── contact-app/
        ├── src/
        │   ├── app/
        │   │   ├── app.ts     # Main component
        │   │   ├── app.html   # Template
        │   │   └── app.css    # Styles
        │   └── index.html
        └── package.json
```

## Local Development

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:3000

### Frontend Setup
```bash
cd frontend/contact-app
npm install
ng serve
```
App runs on http://localhost:4200

## Cloudflare Deployment

### Backend (Cloudflare Workers)
1. Install Wrangler CLI: `npm install -g wrangler`
2. Login: `wrangler login`
3. Create KV namespace: `wrangler kv:namespace create "CONTACTS_KV"`
4. Update `wrangler.toml` with your KV namespace ID
5. Deploy: `wrangler deploy`

### Frontend (Cloudflare Pages)
1. Build: `ng build`
2. Upload `dist/contact-app` folder to Cloudflare Pages
3. Set build command: `ng build`
4. Set output directory: `dist/contact-app`

## Form Fields

- **Name**: Required text field
- **Mobile Number**: Required 10-digit number
- **Email ID**: Required valid email address

## API Endpoints

- `POST /api/contact` - Save contact information
- `GET /api/contacts` - Retrieve all contacts

## Technologies Used

- **Frontend**: Angular 18, TypeScript, CSS3 Animations
- **Backend**: Node.js, Express.js, Cloudflare Workers
- **Storage**: JSON files (local), Cloudflare KV (production)
- **Deployment**: Cloudflare Pages + Workers