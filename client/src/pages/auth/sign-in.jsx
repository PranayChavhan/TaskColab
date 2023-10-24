import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Typography,
  Avatar,
  TabsHeader,
  Tabs,
  Tab,
} from "@material-tailwind/react";
import LoginFromCard from "@/widgets/cards/login-form-card";
import { Toaster, toast } from "react-hot-toast";
import SignupFromCard from "@/widgets/cards/signup-form-card";
import ResetPasswordFrom from "@/widgets/cards/reset-password-form";
import ForgotPasswordCard from "@/widgets/cards/forgot-password-card";
import { API } from "@/services/api";
import VerifyOtpForm from "@/widgets/cards/verify-otp-form";
import { DataContext } from "@/context/DataProvider";

export function SignIn({ setIsAuthenticated }) {
  const [form, setForm] = useState('signin')
  const navigate = useNavigate();

  const { account, setAccount } = useContext(DataContext);


  //data from Login Form
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  //Handle Login
  const submitLogin = async () => {
    console.log(loginData)
    if (!loginData.email || !loginData.password) {
      return toast.error("Please Fill all the fields!")
    }

    if (!validateEmail(loginData.email)) {
      return toast.error("Please enter valid email!")
    }

    try {
      //Proceed To Login
      let response = await API.userLogin(loginData);

      if (response.isSuccess) {
        console.log("Successfully sign in")
        toast.success("Logged In!")
        // setMode("verify");
        console.log(response.msg);

        const { user } = response.data;

        setAccount({
          user_id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username
        })

        sessionStorage.setItem("accessToken", `Bearer ${response.data.token}`)
        setIsAuthenticated(true);
        navigate('/dashboard/home')
      }
      else {
        console.log("Failed to sign in");
        toast.error(response.msg)
      }
    } catch (err) {
      console.log("Error:", err)
      toast.error(err.msg);
    }

  }

  //data from SignUpForm
  const [signUpData, setSignUpData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  })

  //Submit Signup
  const submitSignUp = async () => {
    if (!signUpData.email || !signUpData.firstname || !signUpData.lastname || !signUpData.password || !signUpData.username) {
      return toast.error("Please fill all the fields!")
    }

    if (!validateEmail(signUpData.email)) {
      return toast.error("Invalid Email Address!")
    }
    console.log(signUpData)
    try {
      //Proceed To Signup
      let response = await API.userSignup(signUpData);

      if (response.isSuccess) {
        console.log("Successfully sign in")

        toast.success("Account Created!")
        //Verify OTP
        setForm('verify-otp');
      }
      else {
        console.log("Failed to sign in");
      }
    } catch (err) {
      console.log("Error:", err)
      toast.error(err.msg);
    }

  }
  //Verify OTP
  const [otp, setOtp] = useState('');

  const submitVerifyOtp = async () => {

    if (!otp || otp.length != 5) {
      return toast.success("Invalid OTP!")
    }


    const otpData = {
      otp: otp,
      email: signUpData.email
    }

    console.log(otpData)


    try {
      let response = await API.verifyOtp(otpData);
      console.log(response.data);
      if (response.isSuccess) {
        console.log("Successfully verified");
        // setMode("login");
        toast.success("Account Verified!")
      }
      else {
        console.log("Failed to sign in");
        toast.error("Verification Failed!")
      }
    } catch (err) {
      console.log("Error:", err)
      toast.error(err.msg);
    }
  }


  //Send OTP to reset password
  const sendOTP = async () => {
    //Open Reset Password!
    // setForm('reset');

    if (!loginData.email || !validateEmail(loginData.email)) {
      return toast.error("Invalid Email!");
    }

    console.log(loginData.email)
    try {
      let response = await API.forgotPass({ email: loginData.email });
      if (response.isSuccess) {
        // setOtpMode('otpsend');
        toast.success("OTP Sent")
        console.log("Successfully send the otp");
        setForm('reset');
      }
      else {

        toast.error("Error sending otp!")
        console.log("Failed to sign in");
      }
    } catch (err) {
      console.log("Error:", err)
      toast.error(err.msg);
    }
  }


  //Reset Password
  const resetPassword = async () => {

    if (!loginData.email || !validateEmail(loginData.email)) {
      return toast.error("Invalid Email")
    }

    if (!otp || otp.length != 5) {
      return toast.error("Invalid OTP!")
    }


    // Reset the password
    const resetData = {
      email: loginData.email,
      otp: otp,
      password: loginData.password
    }


    try {
      let response = await API.resetPassword(resetData);
      if (response.isSuccess) {
        console.log("Successfully reset password")
        toast.success('Password changed!!')
        setForm('signin')
      }
      else {
        toast.error(response.msg)
        console.log("Failed to sign in");
      }
    } catch (err) {
      console.log("Error:", err)
      toast.error(err.msg);
    }
  }


  //Utility Methods
  const validateEmail = (email) => {
    return String(email).match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }



  return (
    <>
      {/*Toast */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <div className="w-screen h-screen flex">
        <div className="w-0 md:w-7/12">
          <div className="header p-6">
            <Link to="/" className="flex items-center gap-4 py-6 px-8">
              <Avatar src="/img/logo-ct.png" size="md" />
              <Typography
                variant="h5"
                color="blue-gray"
              >
                Task<span className="text-pink-900">Collab</span>
              </Typography>
            </Link>
          </div>

          <div className="md:mx-20">
            {
              form == 'signin' ?
                <img
                  src="/img/login.jpg" /> :
                <img
                  src="/img/signup.jpg" />
            }
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-screen md:w-5/12  flex flex-col items-center p-4 bg-blue-50 pt-32">
          <div className="w-96">
            <Tabs value="sigin">
              <TabsHeader>
                <Tab value="sigin" onClick={() => setForm('signin')}>
                  SignIn
                </Tab>

                <Tab value="signup" onClick={() => setForm('signup')}>
                  SignUp
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {/* Forms */}
          {

            (form == 'forgot') ?
              <ForgotPasswordCard loginData={loginData} setLoginData={setLoginData} sendOTP={sendOTP} /> :
              (form == 'reset') ?
                <ResetPasswordFrom loginData={loginData} setLoginData={setLoginData} otp={otp} setOtp={setOtp} resetPassword={resetPassword} /> :
                (form == 'verify-otp') ?
                  <VerifyOtpForm otp={otp} setOtp={setOtp} verifyOtp={submitVerifyOtp} /> :
                  (form == 'signin') ?
                    <LoginFromCard setForm={setForm} loginData={loginData} setLoginData={setLoginData} submitLogin={submitLogin} /> :
                    <SignupFromCard signUpData={signUpData} setSignUpData={setSignUpData} submitSignUp={submitSignUp} />
          }
        </div>

      </div>
    </>
  );
}

export default SignIn;
