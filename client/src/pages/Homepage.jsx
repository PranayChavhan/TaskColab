import { useContext } from "react";
import { DataContext } from "../context/DataProvider";



const Homepage = () => {
    const {account}  = useContext(DataContext);
    return (
        <div>
            <p className="text-lg font-bold">
                Hello {account.firstname} !! welcome to taskcollab;
            </p>
        </div>
    );
}

export default Homepage;