import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent } from "react";
import SearchBar from "../components/searchBar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-7xl font-bold">zen a repository !</h1>
      <div className="mt-8">
        <SearchBar></SearchBar>
      </div>
    </div>
  );
};

export default Home;
