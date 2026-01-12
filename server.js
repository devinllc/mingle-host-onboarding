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
// Delete Account Page
app.get('/delete-account', (req, res) => {
    res.render('delete_account', {
        title: 'Delete Account - Mingle',
        error: null,
        success: null
    });
});

// Privacy Policy Page
app.get('/privacy-policy', (req, res) => {
    res.render('privacy_policy', {
        title: 'Privacy Policy - Mingle'
    });
});

// Terms & Conditions Page
app.get('/terms-conditions', (req, res) => {
    res.render('terms_conditions', {
        title: 'Terms & Conditions - Mingle'
    });
});

// Favicon route to prevent 404 errors
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

app.get('/favicon.png', (req, res) => {
    res.status(204).end();
});

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
        console.log('Raw form data:', formData);

        // Process languages - backend expects comma-separated STRING, not array
        let languageString = "";
        if (formData.language) {
            if (Array.isArray(formData.language)) {
                languageString = formData.language.join(', ');
            } else if (typeof formData.language === 'string') {
                languageString = formData.language;
            }
        }

        const apiData = {
            phoneNumber: formData.phoneNumber,
            name: formData.name,
            email: formData.email,
            profileName: formData.profileName,
            hostType: "solo", // Required field - default to solo since we removed it from form
            city: formData.city,
            state: formData.state,
            country: formData.country,
            age: parseInt(formData.age),
            dob: formData.dob,
            gender: formData.gender || "Female", // Default to Female if not provided
            hobbies: "General interests", // Default value since field was removed
            hostingExperiences: "New to hosting", // Default value since field was removed
            language: languageString, // Send as STRING, not array
            availability: "Flexible timing", // Default value since field was removed
            bio: "Enthusiastic host ready to connect with people", // Default value since field was removed
            occupation: formData.occupation,
            educationLevel: formData.educationLevel,
            agencyId: formData.agencyId || "674fa0e81234abcd56789abd", // Use selected agency or default
            profilePhoto: "https://your-cdn.com/images/default_profile.jpg" // Default photo
        };

        console.log('Sending data to API:', apiData);

        // Call your backend API
        const response = await axios.post('https://nemesistech.in/api/v1/host/onboard', apiData, {
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

        // Handle different types of API responses
        if (error.response?.data) {
            if (typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE html>')) {
                // API returned HTML instead of JSON - likely a validation error
                if (error.response.data.includes('phoneNumber, name, profileName, city &amp; hostType are required')) {
                    errorMessage = 'Required fields are missing. Please fill in all mandatory fields.';
                } else if (error.response.data.includes('hobbies.split is not a function')) {
                    errorMessage = 'Data format error. Please try again with properly formatted hobbies.';
                } else if (error.response.data.includes('language.split is not a function')) {
                    errorMessage = 'Data format error. Please try again with properly formatted languages.';
                } else {
                    errorMessage = 'Server validation error. Please check your data and try again.';
                }
            } else if (error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response.data.error) {
                errorMessage = error.response.data.error;
            }
        } else if (error.message) {
            errorMessage = `Network error: ${error.message}`;
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
    console.log('Mingle Host Onboarding Server Started');
});