import { Link } from "react-router-dom";
import { BsArrowLeft }  from "react-icons/bs";

const BackButton = ({destination ='/'})=>{
    return(
        <div className="flex">
            <link
            to={destination}
            className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
                
                <BsArrowLeft className="text-2x1"/>

        </link>

        </div>
    )
}
export default BackButton