# Mingle Partner Onboarding

A beautiful, responsive partner onboarding application built with Express.js, EJS, and Tailwind CSS.

## Features

- 🎨 Modern, animated UI with Tailwind CSS
- 📱 Mobile-first responsive design
- 🔧 Multi-language selection dropdown
- ✨ Smooth animations and transitions
- 🔒 Secure form validation
- 🚀 Vercel deployment ready

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mingle-partner-onboarding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Vercel Deployment

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N` (for new deployment)
   - Project name: `mingle-partner-onboarding`
   - Directory: `./` (current directory)

4. **Production deployment**
   ```bash
   vercel --prod
   ```

## Environment Variables

No environment variables are required for basic functionality. The application uses:
- Fixed Agency ID: `674fa0e81234abcd56789abd`
- API Endpoint: `https://mingle-backend.vercel.app/api/v1/host/onboard`

## Project Structure

```
├── public/
│   ├── css/
│   │   ├── image.png          # Main illustration
│   │   ├── mingle_logo.png    # Logo
│   │   └── style.css          # Legacy styles (not used)
│   └── js/
│       └── script.js          # Enhanced form functionality
├── views/
│   └── partner_onboarding.ejs # Main template
├── server.js                  # Express server
├── package.json              # Dependencies
├── vercel.json               # Vercel configuration
└── README.md                 # This file
```

## Key Features

### Form Fields
- **Required Fields**: Name, Email, Phone, Profile Name, Age, DOB, City, State, Country, Education, Occupation, Languages, Hobbies, Bio
- **Optional Fields**: Availability
- **Fixed Fields**: Gender (Female), Agency ID

### Mobile Optimization
- Responsive design that works on all devices
- Touch-friendly interface
- Optimized scrolling for mobile
- Mobile-specific header with illustration

### Animations
- Smooth slide-up animations for form fields
- Floating illustration animation
- Loading states with spinners
- Success/error notifications

## API Integration

The form submits to: `https://mingle-backend.vercel.app/api/v1/host/onboard`

### Request Format
```json
{
  "phoneNumber": "string",
  "name": "string",
  "email": "string",
  "profileName": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "age": "number",
  "dob": "string",
  "gender": "Female",
  "hobbies": ["array", "of", "strings"],
  "hostingExperiences": "string",
  "language": ["array", "of", "languages"],
  "availability": "string",
  "bio": "string",
  "occupation": "string",
  "educationLevel": "string",
  "agencyId": "674fa0e81234abcd56789abd",
  "profilePhoto": "https://your-cdn.com/images/default_profile.jpg"
}
```

## Customization

### Colors
The primary color scheme uses `#ED4D5E`. To change colors, update the Tailwind config in `views/partner_onboarding.ejs`:

```javascript
colors: {
  primary: {
    500: '#ED4D5E', // Change this to your desired color
    // ... other shades
  }
}
```

### Logo
Replace `/css/mingle_logo.png` with your logo file.

### Illustration
Replace `/css/image.png` with your illustration file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized for mobile devices
- Lazy loading animations
- Efficient form validation
- Minimal JavaScript footprint

## Support

For issues or questions, please contact the development team.

## License

ISC License - See package.json for details.