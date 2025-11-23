# 🚀 Integration Guide: Copy Registration Form to Existing Express Backend

## 📋 Overview
This guide shows you how to copy and integrate the registration form into your existing Express backend with minimal setup.

## 📁 Files to Copy

### 1. **Views Directory**
Copy the entire `views/` folder to your existing project:
```
your-existing-project/
├── views/
│   └── registration.ejs
```

### 2. **Public Assets**
Copy the `public/` folder contents to your existing public directory:
```
your-existing-project/
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── image.png
│   │   └── mingle_logo.png
│   └── js/
│       └── script.js
```

## ⚙️ Backend Integration

### 1. **Install Required Dependencies**
Add these to your existing `package.json`:
```bash
npm install ejs body-parser axios
```

### 2. **Update Your Main Server File**
Add this configuration to your existing Express server:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();

// Set EJS as template engine (add this if not already set)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware (add these if not already present)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Registration Routes (ADD THESE ROUTES)
app.get('/registration', (req, res) => {
    res.render('registration', { 
        title: 'Host Registration - Mingal',
        error: null,
        success: null 
    });
});

app.post('/register', async (req, res) => {
    try {
        const formData = req.body;
        
        // YOUR CUSTOM LOGIC HERE
        // Example: Save to database, call external API, etc.
        console.log('Registration data received:', formData);
        
        // Example external API call (replace with your API)
        // const response = await axios.post('YOUR_API_ENDPOINT', formData);
        
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: null,
            success: 'Registration submitted successfully!' 
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: 'Registration failed. Please try again.',
            success: null 
        });
    }
});
```

### 3. **Form Data Structure**
The form submits these fields:
```javascript
{
    fullName: "John Doe",
    email: "john@example.com",
    countryCode: "+91",
    phoneNumber: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    interests: "Music, Travel, Gaming",
    videoExperience: "Some",
    languages: "English, Hindi",
    availability: "Evening",
    bio: "Passionate about connecting people..."
}
```

## 🎨 Customization Options

### 1. **Change Colors**
Update `public/css/style.css` to match your brand:
```css
/* Main theme colors */
body {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

.logo h1 {
    color: #YOUR_BRAND_COLOR;
}

.submit-btn {
    background: linear-gradient(135deg, #YOUR_BUTTON_COLOR_1 0%, #YOUR_BUTTON_COLOR_2 100%);
}
```

### 2. **Update Logo**
Replace `public/css/mingle_logo.png` with your logo and update the CSS:
```css
.logo-icon {
    background-image: url('/css/your_logo.png');
}
```

### 3. **Modify Form Fields**
Edit `views/registration.ejs` to add/remove fields as needed.

## 🔗 API Integration Examples

### 1. **Save to Database (MongoDB)**
```javascript
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: null,
            success: 'Registration successful!' 
        });
    } catch (error) {
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: 'Registration failed. Please try again.',
            success: null 
        });
    }
});
```

### 2. **Call External API**
```javascript
app.post('/register', async (req, res) => {
    try {
        const response = await axios.post('https://your-api.com/register', {
            ...req.body,
            timestamp: new Date().toISOString()
        });
        
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: null,
            success: 'Registration submitted successfully!' 
        });
    } catch (error) {
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: 'Registration failed. Please try again.',
            success: null 
        });
    }
});
```

### 3. **Send Email Notification**
```javascript
const nodemailer = require('nodemailer');

app.post('/register', async (req, res) => {
    try {
        // Save registration data
        // ... your save logic ...
        
        // Send email notification
        const transporter = nodemailer.createTransporter({
            // your email config
        });
        
        await transporter.sendMail({
            from: 'noreply@mingal.com',
            to: req.body.email,
            subject: 'Welcome to Mingal!',
            html: `<h1>Welcome ${req.body.fullName}!</h1><p>Your registration is being processed.</p>`
        });
        
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: null,
            success: 'Registration successful! Check your email.' 
        });
    } catch (error) {
        res.render('registration', { 
            title: 'Host Registration - Mingal',
            error: 'Registration failed. Please try again.',
            success: null 
        });
    }
});
```

## 🚀 Quick Start Commands

1. **Copy files to your project**
2. **Install dependencies:**
   ```bash
   npm install ejs body-parser axios
   ```
3. **Add routes to your server file**
4. **Start your server:**
   ```bash
   npm start
   ```
5. **Visit:** `http://localhost:YOUR_PORT/registration`

## 📱 Mobile Responsive
The form is fully responsive and works on all devices.

## 🔒 Security Features
- Form validation (client & server side)
- CSRF protection ready
- Input sanitization
- Secure data handling

## 🎯 Next Steps
1. Integrate with your user authentication system
2. Add database models for user data
3. Implement email verification
4. Add file upload for profile pictures
5. Connect to your video calling API

---

**Need help?** The form is ready to use with minimal configuration. Just copy the files and add the routes!