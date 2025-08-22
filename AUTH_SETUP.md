# Authentication Setup Guide

This guide will help you set up OAuth authentication with Google and GitHub for your Kanban Board application.

## Prerequisites

- Firebase project
- Google Cloud Console access
- GitHub account for OAuth app creation

## 1. Firebase Setup

### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "kanban-board-auth")
4. Follow the setup wizard

### Enable Authentication

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Google**: Click on Google → Enable → Save
   - **GitHub**: Click on GitHub → Enable → Add your GitHub OAuth App credentials (see GitHub setup below)

### Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web (</>) icon
4. Register your app with a nickname
5. Copy the configuration object

## 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-actual-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

## 3. GitHub OAuth Setup

### Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the application details:
   - **Application name**: Your app name (e.g., "Kanban Board")
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: `https://your-project.firebaseapp.com/__/auth/handler`
4. Click **Register application**
5. Copy the **Client ID** and **Client Secret**

### Configure GitHub in Firebase

1. Go back to Firebase Console → **Authentication** → **Sign-in method**
2. Click on **GitHub**
3. Enter your GitHub **Client ID** and **Client Secret**
4. Copy the authorization callback URL from Firebase and update it in your GitHub OAuth app settings

## 4. Domain Configuration (Production)

### Firebase Authorized Domains

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your production domain (e.g., `yourdomain.com`)

### Update GitHub OAuth App

1. Update the **Homepage URL** and **Authorization callback URL** in your GitHub OAuth app with your production URLs

## 5. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`
3. You should see the login page with Google and GitHub buttons
4. Test both authentication methods

## Security Notes

- Never commit your `.env` file to version control
- Use different Firebase projects for development and production
- Regularly rotate your OAuth secrets
- Monitor authentication logs in Firebase Console

## Troubleshooting

### Common Issues

1. **"auth/unauthorized-domain"**: Add your domain to Firebase authorized domains
2. **"auth/popup-blocked"**: Ensure popups are allowed in browser settings
3. **GitHub OAuth fails**: Verify callback URL matches exactly in GitHub settings
4. **Firebase config errors**: Double-check all environment variables are set correctly

### Debug Mode

Add this to your `.env` for additional logging:
```env
REACT_APP_DEBUG_AUTH=true
```

## Features Included

- ✅ Google OAuth authentication
- ✅ GitHub OAuth authentication  
- ✅ Persistent login sessions
- ✅ Protected routes
- ✅ User profile display
- ✅ Secure logout
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design