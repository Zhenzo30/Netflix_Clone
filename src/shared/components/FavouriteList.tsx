import { useEffect } from "react";
import useUser from "@/stores/user.store";
import Movies from "./Movies";


const FavouriteList = () => {


    const { favourites, updateFavourites } = useUser();

    useEffect(() => {
        updateFavourites();
    }, [updateFavourites]);

    return <div className="my-8">
        <Movies movies={favourites} label="My List"/>
    </div>;
};

export default FavouriteList;