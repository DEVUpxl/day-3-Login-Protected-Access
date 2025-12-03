const User = require('../models/User'); // User मॉडल को import करें (User.js जो आपने models फोल्डर में बनाया है)
const bcrypt = require('bcryptjs');     // पासवर्ड हैश करने के लिए

// Registration Logic
const registerUser = async (req, res) => {
    // 1. Request Body से details निकालें (destructuring)
   
    const { name, email, password } = req.body;

    // 2. Validation 
    if (!name || !email || !password) {
            return res.status(400).json({ msg: ' });
    }

    try {
                let user = await User.findOne({ email });

        if (user) {
        
            return res.status(400).json({ msg: '(registered) ' });
        }

         User (Mongoose Document)
        user = new User({
            name,
            email,
            password, 
        });

        
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt); 
        
    User Database 
        await user.save();

       res.status(201).json({ 
            msg: 'यूज़र सफलतापूर्वक पंजीकृत हुआ।', 
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

 export module.exports = {
    registerUser
};


console.log('Received body:', req.body);
