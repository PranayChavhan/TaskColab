//Nodejs + Mysql
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require("../models/userModel");
const sendMail = require('../services/mailService');

class AuthController {

    // [GET]  /auth/users
    async getUsers(req, res) {
        try {
            const users = await userModel.getUsers();

            return res.status(200).json({ msg: "Users Fetched!", users: users })
        }
        catch (err) {
            console.log("# ERROR", err)
            return res.status(500).json({ msg: "Something went wrong!" })
        }
    }

    // [POST] /auth/register
    async register(req, res) {
        const { firstname, lastname, username, email, password } = req.body;
        console.log("req.body", req.body);

        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" })
        }

        if (password.length < 6) {
            return res.status(400).send({ msg: "Password must be at least 6 characters long" })
        }

        try {
            //Find User by email to check if user already exists
            const user = await userModel.getUserByEmail(email);
            console.log(user);
            if (user) {
                return res.status(400).json({ msg: "User already exists" })
            }

            //Generate OTP Before Creating It
            const otp = Math.floor(10000 + Math.random() * 90000);

            //hash password
            const password_hash = await bcrypt.hash(password, 10);


            //create a custom user avatar
            const profile_image_url = `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random`;

            //Create new user
            const newUser = {
                firstname,
                lastname,
                username,
                email,
                password_hash,
                profile_image_url,
                otp,
            }

            //Add User to db
            await userModel.createUser(newUser);

            //send mail to reset password
            const to = email;
            const subject = 'Verify your email address';
            // const html = htmlForgotPassword(user.name, otp.toString()); //Future
            const html = `<p>Hi ${firstname},</p>
                <p>Here is your OTP: <b>${otp} to verify your email address.</b></p>
                <p>Thanks,</p>
                <p>Team TaskCollab</p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
            await sendMail(to, subject, html);

            return res.status(200).json({ msg: 'User created successfully' });
        } catch (err) {
            console.log("# ERROR: ", err)
            return res.status(500).json({ msg: err.message })
        }
    }

    // [POST] /api/auth/verifyotp
    async verifyOTP(req, res) {
        const otp = req.body.otp;
        const email = req.body.email;

        if (otp == null || email == null) {
            console.log("Nulll Fields")
            return res.status(400).json({ msg: "Please fill in all fields" });
        }

        if (otp.length != 5) {

            return res.status(400).json({ msg: "Invalid OTP" });
        }

        try {
            //Check OTP
            const user = await userModel.getUserByEmail(email);

            if (!user) {
                return res.status(400).json({ msg: "User does not exist" });
            }

            console.log("OTP")
            console.log(req.body);

            if (user.otp === parseInt(otp)) {

                //Update OTP
                const randomOTP = Math.floor(10000 + Math.random() * 90000);
                await userModel.updateOTP(email, randomOTP);
                return res.status(200).json({ msg: "OTP verified successfully!" });
            }

            return res.status(400).json({ msg: "Invalid OTP" });

        } catch (err) {
            console.log("# ERROR: ", err)
            console.log(err)
            return res.status(500).json({ msg: err.message });
        }
    }

    // [POST] /api/auth/login
    async login(req, res) {
        const { email, password } = req.body;

        console.log(req.body)

        if (!email || !password) {
            console.log("Nulll Fields")

            return res.status(400).json({ msg: "Please fill in all fields" })
        }

        try {
            //find user by email
            const user = await userModel.getUserByEmail(email);
            if (!user) {
                console.log("no user")

                return res.status(400).json({ msg: "User does not exist" })
            }
            //check if password is coorect 

            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                console.log("Invalid Creds")
                return res.status(400).json({ msg: "Invalid credentials" })
            }
            //Gnenerate access token

            console.log("USER ID")

            const token = jwt.sign({ userId: user.user_id, fname: user.firstname }, process.env.JWT_SECRET);

            return res.status(200).json({
                token,
                msg: "Logged in successfully",
                user: {
                    id: user.user_id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    profile_image_url: user.profile_image_url,
                    updated_at: user.updated_at,
                }
            });

        } catch (err) {
            console.log("# ERROR: ", err)
            return res.status(500).json({ msg: err.message })
        }
    }

    // [POST] /api/auth/forgotpassword
    async forgotPassword(req, res) {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ msg: "Please fill in all fields" })
        }

        try {
            //Find User By Email
            const user = userModel.getUserByEmail(email);

            if (!user) {
                return res.status(400).json({ msg: "User does not exist" })
            }

            //Now Send Email if user Exists
            const otp = Math.floor(10000 + Math.random() * 90000);

            //Update OTP
            await userModel.updateOTP(email, otp);

            //Send Mail 
            //send mail to reset password
            const to = email;
            const subject = 'Reset your password';
            // const html = htmlForgotPassword(user.name, otp.toString()); //Future
            const html = `<p>Hi ${user.firstname},</p>
                <p>Here is your OTP: <b>${otp} to reset your password.</b></p>
                <p>Thanks,</p>
                <p>Team TaskCollab</p>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
            await sendMail(to, subject, html);
            return res.status(200).json({ msg: 'OTP sent successfully' });

        } catch (err) {
            console.log("# ERROR: ", err)
            return res.status(500).json({ msg: err.message })
        }
    }

    // [POST] /api/auth/resetpassword
    async resetPassword(req, res) {
        const { email, otp, password } = req.body;


        console.log("Request Data: ");
        console.log(req.body);

        if (!otp || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" })
        }

        try {
            const user = await userModel.getUserByEmail(email);
            console.log("User:   ")
            console.log(user)

            if (!user) {
                return res.status(400).json({ msg: "User does not exist" })
            }

            console.log(user.otp);
            console.log(otp);
            if (user.otp != otp) {
                return res.status(400).json({ msg: "Invalid OTP" })
            }

            //hash password 
            const password_hash = await bcrypt.hash(password, 10);

            //Update Password
            await userModel.updatePassword(email, password_hash);

            res.status(200).json({ msg: "Password updated successfully" });
        } catch (err) {
            console.log("# ERROR: ", err)
            return res.status(500).json({ msg: err.message });
        }

    }


}


module.exports = new AuthController();