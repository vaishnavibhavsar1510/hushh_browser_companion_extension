const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, username } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vaishnavibhavsar03@gmail.com',
            pass: 'your-app-specific-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Security Alert: New Login Detected',
        text: `Hello ${username},\n\nA login to your account was detected. If this was not you, please secure your account immediately.\n\nBest,\nYour Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: error.toString() });
        }
        res.status(200).json({ message: 'Login email sent successfully.' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
