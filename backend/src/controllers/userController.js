
import User from "../models/userModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed' });
      console.log(err);
      
    }
  };


 
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      const options = {
        userId: user._id,
        time: Date.now(),
    }


    const cookieParams = { httpOnly: false,
        secure: true, 
        sameSite: "none",
        path: '/', 
        maxAge: 1 * 60 * 60 * 1000  };

  
      const token =  jwt.sign(options, process.env.JWT_SECRET, { expiresIn: '60min' })

      res.cookie("user", token, cookieParams);
      
      res.json({ 
        message: 'Login successful',
        highScore: user.highScore,
        pastScores: user.pastScores,
        userName : user.username ,
        token,
        userId : user._id
      });
    } catch (err) {
      res.status(500).json({ message: 'Login failed' });
    }
  };
  



export const verify = async(req, res) => {

  const {userId} = req

 try {

  const user = await User.findOne({ _id : userId });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email' });
  }

   res.send({isValid:true,userId:req.userId,highScore: user.highScore,
     pastScores: user.pastScores});
 } catch (error) {
  
 }
};


export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

  