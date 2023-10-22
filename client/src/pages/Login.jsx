import { API } from "../services/api";
import { useState } from "react";
import loginImg from "../assets/login3.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";


const intialUser = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    username: ''
}

const intialLogin = {
    email : '',
    password : ''
}

const intialotp = {
    otp: '',
    email: 'dschopade7k@gmail.com'
}

const intialResetData = {
    email: '',
    otp: '',
    password: ''
}


const Login = ({setIsAuthenticated}) => {

    const [user, setUser] = useState(intialUser);
    const [mode, setMode] = useState("login");
    const [otpmode, setOtpMode] = useState("otp");
    const [otp, setOtp] = useState(intialotp);
    const [loginUserData, setLoginUserData] = useState(intialLogin);
    const [resetData, setResetData] = useState(intialResetData);

    //create a useNavigation object
    const navigate =  useNavigate();

    const {account,setAccount} = useContext(DataContext);

    const otpChange = (event) => {
        setOtp({ ...otp, [event.target.name]: event.target.value })
    }

    const onInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const onLoginChange = (event) => {
        setLoginUserData({ ...loginUserData, [event.target.name]: event.target.value })
    }

    const onResetChangeData = (event) => {
        setResetData({ ...resetData, [event.target.name]: event.target.value })
    }
    

    //signup user method
    const signupUser = async () => {
        let response = await API.userSignup(user);
        console.log(response.data);
        setAccount({
            firstname: user.name,
            email: user.email,
            username: user.username
        })
        if (response.isSuccess) {
            console.log("Successfully sign in")
            setMode("verify");
            console.log(account);
        }
        else {
            console.log("Failed to sign in");
        }
    }



    //login user method
    const loginUser = async () => {
        let response = await API.userLogin(loginUserData);
        const {user} = response.data;
        setAccount({
            firstname : user.firstname,
            lastname : user.lastname,
            email : user.email,
            username : user.username
        })

        sessionStorage.setItem("accessToken", `Bearer ${response.data.token}`)
        setIsAuthenticated(true);
        navigate('/');
        if (response.isSuccess) {
            console.log("Successfully log in")
        }
        else {
            console.log("Failed to sign in");
        }
    }

    const handleOtp = async () => {
        let response = await API.verifyOtp(otp);
        console.log(response.data);
        if (response.isSuccess) {
            console.log("Successfully verified");
            setMode("login");
        }
        else {
            console.log("Failed to sign in");
        }
    }

    const forgotPassword = async () => {
        let response = await API.forgotPass({email: resetData.email});
        if (response.isSuccess) {
            setOtpMode('otpsend');
            console.log("Successfully send the otp");
        }
        else {
            console.log("Failed to sign in");
        }
    }

    const resetPass = async () => {
        let response = await API.resetPassword(resetData);
        if (response.isSuccess) {
            console.log("Successfully reset password")
            setMode("login")
        }
        else {
            console.log("Failed to sign in");
        }
    }


    return (
        <div className="flex flex-row  h-screen">
            <div className="flex md:w-1/2 justify-center">
                {mode === "login" &&
                    <div className="flex flex-col w-max md:w-3/4 md:mx-16 mx-4">
                        <div className="text-4xl font-semibold flex justify-start p-6 mt-20">
                            <h1>Login</h1>
                        </div>

                        <div className="flex flex-col gap-3 text-base p-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Email</h3>
                                <input name="email" onChange={e => onLoginChange(e)} className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <h3 className="font-semibold">Password</h3>
                                <input name="password" onChange={e => onLoginChange(e)} className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Enter your password" />
                            </div>

                            <button onClick={() => loginUser()} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Login</button>
                            <div className="flex flex-auto">
                                <div className="flex flex-row w-max">
                                    <p className="w-max">Dont have an account? &nbsp;</p>
                                    <p onClick={() => setMode("signup")} className="text-blue-700 w-max underline hover:font-semibold cursor-pointer">Sign up.</p>
                                </div>
                                <div className="flex justify-end w-full">
                                    <p onClick={() => setMode("resetpass")} className="text-blue-700   underline hover:font-semibold cursor-pointer">Forgot Password?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {mode === "signup" &&
                    <div className="flex flex-col  md:w-3/4 md:mx-16 mx-4 overflow-auto no-scrollbar">
                        <div className="text-4xl font-semibold flex justify-start p-6 mt-2">
                            <h1>Signup</h1>
                        </div>

                        <div className="flex flex-col gap-3 text-base p-6">
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <h3 className="font-semibold">Firstname</h3>
                                    <input onChange={(e) => onInputChange(e)} name="firstname" className="p-2 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your name" />
                                </div>

                                <div className="flex flex-col gap-2 w-1/2">
                                    <h3 className="font-semibold">Lastname</h3>
                                    <input onChange={(e) => onInputChange(e)} name="lastname" className="p-2 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your name" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Username</h3>
                                <input onChange={(e) => onInputChange(e)} name="username" className="p-2 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Email</h3>
                                <input onChange={(e) => onInputChange(e)} name="email" className="p-2 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Password</h3>
                                <input onChange={(e) => onInputChange(e)} name="password" className="p-2 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Enter your password" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Confirm Password</h3>
                                <input className="p-2 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Renter your password" />
                            </div>

                            <button onClick={() => signupUser()} className="p-2 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Signup</button>
                            <div className="flex flex-row">
                                <p>Already have an account? &nbsp;</p>
                                <p onClick={() => setMode("login")} className="text-blue-700 hover:font-semibold cursor-pointer">Login</p>
                            </div>
                        </div>
                    </div>
                }

                {mode === "resetpass" &&
                    <div className="flex flex-col  md:w-3/4 md:mx-16 mx-4">
                        <div className="text-4xl font-semibold flex justify-start p-6 mt-20">
                            <h1>Reset Password</h1>
                        </div>

                        <div className="flex flex-col gap-3 text-base p-6">
                            <div className="text-lg">
                                <p>Enter the email associated with your account</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Email</h3>
                                <input name="email"  onChange={e => onResetChangeData(e)} className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            {otpmode === "otpsend" &&
                                <div className="mt-4">
                                    <p>Enter the otp send on your email in the section below.</p>
                                    <div className="mt-4 flex flex-col gap-2">
                                        <input name="otp" onChange={e => onResetChangeData(e)} className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter the otp" />
                                    </div>

                                    <button onClick={() => setMode("resetpage")} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Submit</button>
                                </div>
                            }

                            {otpmode === "otp" && <button onClick={() => forgotPassword()} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Send passcode</button>}
                        </div>
                    </div>
                }

                {mode === "resetpage" &&
                    <div className="flex flex-col  md:w-3/4 md:mx-16 mx-4">
                        <div className="text-4xl font-semibold flex justify-start p-6 mt-20">
                            <h1>Set New Password</h1>
                        </div>
                        <div className="flex flex-col gap-3 text-base p-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">New Password</h3>
                                <input name="password" onChange={e => onResetChangeData(e)} className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Enter new password" />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <h3 className="font-semibold">Confirm New Password</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="ReEnter New password" />
                            </div>

                            <button onClick={() => resetPass()} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Reset Password</button>
                        </div>
                    </div>
                }


                {mode === "verify" &&
                    <div className="flex flex-col  md:w-3/4 md:mx-16 mx-4">
                        <div className="text-4xl font-semibold flex justify-start  mt-28">
                            <h1>Verification</h1>
                        </div>

                        <div className="mt-8">
                            <p>Enter the otp send on your email in the section below.</p>
                            <div className="mt-4 flex flex-col gap-2">
                                <input name="otp" onChange={(e) => otpChange(e)} className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter the otp" />
                            </div>

                            <button onClick={() => handleOtp()} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Submit</button>
                        </div>
                    </div>
                }
            </div>
            <div className="md:flex hidden w-1/2 bg-blue-gray-100">
                <div className="flex justify-center items-center">
                    <img className="w-5/6" src={loginImg} alt="login-image" />
                </div>
            </div>
        </div>
    )
}

export default Login