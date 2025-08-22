# Kanban Board with Authentication

A modern Kanban board application with Google and GitHub OAuth authentication built with React, Firebase, and Vite.

## Features

- 🔐 **Secure Authentication**: Google and GitHub OAuth integration
- 📋 **Kanban Board**: Drag and drop task management
- 👤 **User Profiles**: Display user information and avatar
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 📱 **Mobile Friendly**: Responsive design for all devices

## Tech Stack

- **Frontend**: React 18, Vite
- **Authentication**: Firebase Authentication
- **Styling**: CSS3 with modern animations
- **State Management**: React Context API

## Prerequisites

Before running this application, you'll need:

1. **Firebase Project**: Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. **Google OAuth**: Set up Google OAuth in Firebase
3. **GitHub OAuth**: Set up GitHub OAuth in Firebase
4. **Node.js**: Version 16 or higher

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication in the left sidebar
4. Go to "Sign-in method" tab
5. Enable Google and GitHub providers

#### Google OAuth Setup:
- Click on Google provider
- Enable it and add your authorized domain
- Copy the Client ID

#### GitHub OAuth Setup:
- Click on GitHub provider
- Enable it
- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Create a new OAuth App
- Set Authorization callback URL to: `https://your-project.firebaseapp.com/__/auth/handler`
- Copy the Client ID and Client Secret

### 2. Environment Variables

1. Copy the `.env` file in the root directory
2. Replace the placeholder values with your actual Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# GitHub OAuth
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Board.jsx          # Main Kanban board
│   ├── Column.jsx         # Individual columns
│   ├── Task.jsx           # Individual tasks
│   ├── Login.jsx          # Authentication component
│   ├── UserProfile.jsx    # User profile display
│   └── ProtectedRoute.jsx # Route protection
├── contexts/
│   └── AuthContext.jsx    # Authentication context
├── config/
│   └── firebase.js        # Firebase configuration
├── App.jsx                # Main application component
└── main.jsx               # Application entry point
```

## Authentication Flow

1. **Unauthenticated Users**: Redirected to login page
2. **Login Options**: Choose between Google or GitHub
3. **OAuth Flow**: Redirected to provider for authentication
4. **Success**: User is authenticated and can access the Kanban board
5. **Profile**: User information and logout option displayed in header

## Security Features

- Protected routes for authenticated users only
- Secure OAuth implementation with Firebase
- Environment variable protection for sensitive data
- Automatic session management

## Customization

### Styling
- Modify CSS files in the `src/components/` directory
- Update color schemes and animations in component-specific CSS files
- Responsive design breakpoints can be adjusted in CSS media queries

### Authentication Providers
- Add more OAuth providers by modifying `firebase.js`
- Update `AuthContext.jsx` to include new provider methods
- Modify `Login.jsx` to display new provider buttons

## Troubleshooting

### Common Issues

1. **Firebase Configuration Error**
   - Verify all environment variables are set correctly
   - Check Firebase project settings and API keys

2. **OAuth Provider Not Working**
   - Ensure provider is enabled in Firebase Console
   - Verify callback URLs are correct
   - Check browser console for error messages

3. **Build Errors**
   - Clear `node_modules` and reinstall dependencies
   - Check Node.js version compatibility

### Debug Mode

Enable debug logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'firebase:*');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Check the troubleshooting section above
- Review Firebase documentation
- Open an issue in the repository

---

**Note**: Remember to never commit your `.env` file with actual API keys to version control. The `.env` file is already included in `.gitignore` for security.
