"use client";
import Billboard from "@/shared/components/Billboard";
import MovieList from "@/shared/components/MovieList";
import Navbar from "@/shared/components/Navbar";
import { useEffect } from "react"; // <--- CAMBIO AQUÍ: useEffect en lugar de useEffectEvent
import useUser from "@/stores/user.store";

export default function Home() {

  const { updateUser } = useUser();

  useEffect(() => { // <--- CAMBIO AQUÍ: useEffect en lugar de useEffectEvent
    updateUser();
  }, [updateUser]);

  return (
    <div>
      <Navbar />
      <Billboard />
      <MovieList />
    </div>
   );
}