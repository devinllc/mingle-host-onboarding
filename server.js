const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('partner_onboarding', {
        title: 'Mingle Partner Onboarding',
        error: null,
        success: null,
        apiResponse: null
    });
});

app.post('/register', async (req, res) => {
    try {
        const formData = req.body;

        // Transform form data to match your API structure
        const apiData = {
            phoneNumber: formData.phoneNumber,
            name: formData.name,
            email: formData.email,
            profileName: formData.profileName,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            age: parseInt(formData.age),
            dob: formData.dob,
            gender: formData.gender || "Female", // Default to Female if not provided
            hobbies: formData.hobbies.split(',').map(hobby => hobby.trim()),
            hostingExperiences: formData.hostingExperiences,
            language: formData.language ? formData.language.split(',').map(lang => lang.trim()) : [],
            availability: formData.availability || "", // Optional field
            bio: formData.bio,
            occupation: formData.occupation,
            educationLevel: formData.educationLevel,
            agencyId: "674fa0e81234abcd56789abd", // Always use this specific agency ID
            profilePhoto: "https://your-cdn.com/images/default_profile.jpg" // Default photo
        };

        console.log('Sending data to API:', apiData);

        // Call your backend API
        const response = await axios.post('https://mingle-backend.vercel.app/api/v1/host/onboard', apiData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('API Response:', response.data);

        res.render('partner_onboarding', {
            title: 'Mingle Partner Onboarding',
            error: null,
            success: 'Registration submitted successfully! Your partner profile has been created.',
            apiResponse: response.data
        });

    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);

        let errorMessage = 'Registration failed. Please try again.';
        if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }

        res.render('partner_onboarding', {
            title: 'Mingle Partner Onboarding',
            error: errorMessage,
            success: null,
            apiResponse: null
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});