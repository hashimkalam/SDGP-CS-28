import nodemailer from 'nodemailer';

// Create a nodemailer transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elitebluprint.architect@gmail.com',
    pass: 'EliteBluPrint@sdgp',
  },
});

// Generate a random 4-digit OTP code
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP email function
const sendOTPEmail = async (email, otp) => {
  try {
    
    const mailOptions = {
      from: 'elitebluprint.architect@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP code is: ${otp}`,
    };

    

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Controller function to handle form submission and send OTP email
const sendOtpEmail = async (req, res) => {
  try {
    // Extract the entered email from the request body
    const { email } = req.body;

    // Generate a 4-digit OTP code
    const otpCode = generateOTP();

    // Send the OTP email
    await sendOTPEmail(email, otpCode);

    // Log the email and OTP (you can remove this in production)
    console.log('Entered Email:', email);
    console.log('Generated OTP:', otpCode);

    // Respond to the client (you can customize the response as needed)
    res.json({ success: true, message: 'OTP email sent successfully', generatedOtp: otpCode });
} catch (error) {
    console.error('Error handling forgot password request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default sendOtpEmail;
