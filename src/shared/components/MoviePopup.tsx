import { useRef } from "react";

const MoviePopup = () => {

const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <div className="absolute -left-8 w-80 z-10 -top-16 rounded-md text-base transform sacle-75 hover:scale-100 hover:-translate-y-6 transition-transform duration-300 ease-in-out">
            <video />
        </div>
    );
}

export default MoviePopup;