import { User } from '../types/user.types';
import { IMovie } from '../types/movie.types';
import { create } from 'zustand';
import axios from 'axios';

// Corregido: Quitado un salto de línea extra que sobraba aquí

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
        const { data } = await axios.get('/api/me'); // Corregido: { data }
        const { currentUser } = data;               // Corregido: { currentUser }
        set({ user: currentUser });                 // Corregido: { user: ... }
    },
    
    updateFavourites: async () => {
        const { data } = await axios.get('/api/favourites'); // Corregido: { data }
        set({ favourites: data.favourites });                 // Corregido: { favourites: ... }
    }
}));

export default useUser;