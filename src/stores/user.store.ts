import { User } from '../types/user.types';
import { IMovie } from '../types/movie.types';
import { create } from 'zustand';
import axios from 'axios';

type IState = {
    user: User | null;
    favourites: IMovie[];
};

type IAction = {
    updateUser: () => void;
    updateFavourites: () => void;
};

type IUserStoreState = IState & IAction;

const useUser = create<IUserStoreState>((set) => ({
    user: null,
    favourites: [],
    
    updateUser: async () => {
        const { data } = await axios.get('/api/me');
        const { user } = data; // <--- CAMBIO AQUÍ: "currentUser" por "user"
        set({ user: user });   // <--- CAMBIO AQUÍ: Guardamos la variable "user"
    },
    
    updateFavourites: async () => {
        const { data } = await axios.get('/api/favourites');
        set({ favourites: data.favourites });
    }
}));

export default useUser;