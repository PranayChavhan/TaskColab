import { API } from "../services/api";
import { useState } from "react";


const intialUser = {
    name: '',
    userName: '',
    password: '',
}

const Login = () => {

    const [user, setUser] = useState(intialUser);


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
        <div className="flex justify-center">
            <div className="mt-16 flex gap-4 flex-col w-1/4">
                    <input
                        name="name" type="text"
                        onChange={(e) => onInputChange(e)}
                        className="p-2  border-2 outline-none border-gray-600 h-10 rounded-md "
                        placeholder="Enter the name"
                    />
                    <input
                        name="userName" type="text"
                        onChange={(e) => onInputChange(e)}
                        className="p-2 border-2 outline-none border-gray-600 h-10 rounded-md"
                        placeholder="Enter userName"
                    />
                    <input
                        name="password" type="password"
                        onChange={(e) => onInputChange(e)}
                        className="p-2 border-2 outline-none border-gray-600 h-10 rounded-md "
                        placeholder="Enter password"
                    />

                    <div className="flex justify-center">
                        <button onClick={() => signupUser()} className="border-2 w-1/2 hover:bg-gray-600 bg-gray-500 text-gray-800 font-bold p-2 rounded">Sign up</button>
                    </div>
            </div>
        </div>
    )
}

export default Login