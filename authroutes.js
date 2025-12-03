const bcrypt = require('bcryptjs');     
// Registration Logic
const registerUser = async (req, res) => {
    // 1. Request Body details (destructuring)
     Postman : name, email, password
    const { name, email, password } = req.body;

    // 2. Validation
    if (!name || !email || !password) {

        return res.status(400).json({ msg: 'name,email,password' });
    }

    try {
       
        let user = await User.findOne({ email });

        if (user) {
            
            return res.status(400).json({ msg: ' this email is (registered) ' });
        }

        user = new User({
            name,
            email,
            password, 
        });

       
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt);

     
        await user.save();

       
        res.status(201).json({ 
            msg: 'user created successfully', 
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
         console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// इस फंक्शन को export करें
module.exports = {
    registerUser

};
