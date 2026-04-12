interface User {
    name: string;
    email: string;
    image?: string;
    favourites: string[]; // Assuming favourites is an array of movie IDs
}

export { User };