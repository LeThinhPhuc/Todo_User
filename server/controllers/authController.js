const User=require('../models/userModel');
const bcrypt=require('bcrypt')

const authController = {
    registerUser: async (req,res)=>{
        try{
            // const userTmp =await User.findOne({username:req.body.username});
            const emailTmp =await User.findOne({email:req.body.email});

            if(emailTmp) {
                // res.status(200).json("Email existed")
            return res.status(200).json({ message: 'Email existed !' });

            }else{
            const salt=await bcrypt.genSalt(10);

            const hashed=await bcrypt.hash(req.body.password,salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                todos:[]
            })

            //Save user to DB
             const user = await newUser.save();
             res.status(200).json(user);
        }
        } catch(e){
            res.status(500).json(e);
        }
    },


    loginUser: async (req,res)=>{
        try{
            // const user =await User.findOne({username:req.body.username});
            const user =await User.findOne({email:req.body.email});

            if(!user){
                res.status(404).json("Incorrect username")
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                res.status(404).json("Invalid password")
            }
            if(user&&validPassword){
                req.user = user
                console.log("req.user ne : ", req.user)
                res.status(200).json(user)
            }
        } catch(e){
            res.status(500).json(e);
        }
    },


    logOut: async (req,res)=>{
        res.status(200).json("Logged out successfully !")
    }
}


module.exports = authController;