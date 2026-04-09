interface IMovie {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    genres: string;
    duration: string;
    rating: number;
    mood: string;
}

export { IMovie };