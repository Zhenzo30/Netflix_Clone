import { SparkleIcon } from "lucide-react";

const Navbar = () => {
    return (
    <div className="fixed top-0 w-full flex justify-between px-12 py-4 bg-transparent transition-colors duration-1000">
        <div className="flex gap-8 items-center">
            <h1 className="text-[#e50914] cursor-pointer text-[25px]">Netflix</h1>
            <ul className="flex text-sm gap-5">
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Home</li>
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Shows</li>
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Movies</li>
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Games</li>
            </ul>
        </div>
        <div className="flex gap-[15px] items-center">
            <button className="cursor-pointer">
                <SparkleIcon className="text-white" />
            </button>
        </div>
    </div>
    )
};

export default Navbar;