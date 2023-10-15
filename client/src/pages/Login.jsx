import { API } from "../services/api";
import { useState } from "react";
import loginImg from "../assets/login3.png"


const intialUser = {
    name: '',
    userName: '',
    password: '',
}

const Login = () => {

    const [user, setUser] = useState(intialUser);
    const [mode, setMode] = useState("login");
    const [otpmode, setOtpMode] = useState("otp");


    const onInputChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const signupUser = async () => {
        let response = await API.userSignup(user);
        if (response.isSuccess) {
            console.log("Successfully sign in")
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
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <h3 className="font-semibold">Password</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Enter your password" />
                            </div>

                            <button className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Login</button>
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
                    <div className="flex flex-col  md:w-3/4 md:mx-16 mx-4">
                        <div className="text-4xl font-semibold flex justify-start p-6 mt-6">
                            <h1>Signup</h1>
                        </div>

                        <div className="flex flex-col gap-3 text-base p-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Name</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your name" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Email</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Password</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Enter your password" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Confirm Password</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Renter your password" />
                            </div>

                            <button className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Signup</button>
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
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter your email" />
                            </div>

                            {otpmode === "otpsend" &&
                                <div className="mt-4">
                                    <p>Enter the otp send on your email in the section below.</p>
                                    <div className="mt-4 flex flex-col gap-2">
                                        <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="text" placeholder="Enter the otp" />
                                    </div>

                                    <button onClick={() => setMode("resetpage")} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Submit</button>
                                </div>
                            }

                            {otpmode === "otp" && <button onClick={() => setOtpMode("otpsend")} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Send passcode</button>}
                        </div>
                    </div>
                }

                {mode === "resetpage" &&
                    <div className="flex flex-col  md:w-3/4 md:mx-16 mx-4">
                        <div className="mt-24 p-6 flex flex-row">
                            <p>If you dont want to reset the password head back to &nbsp;</p>
                            <p onClick={() => setMode("login")} className="text-blue-700 underline hover:font-semibold cursor-pointer">Login page</p>
                        </div>
                        <div className="flex flex-col gap-3 text-base p-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">New Password</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="Enter new password" />
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <h3 className="font-semibold">Confirm New Password</h3>
                                <input className="p-4 outline-none border-gray-400 border-2 rounded-md" type="password" placeholder="ReEnter New password" />
                            </div>

                            <button onClick={() => setMode("login")} className="p-4 mt-4 hover:bg-teal-500  bg-teal-400 text-white outline-none border-gray-400 border-2 rounded-md">Reset Password</button>
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