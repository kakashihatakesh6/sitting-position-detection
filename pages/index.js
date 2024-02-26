import Link from "next/link";
import { useState } from "react";

export default function Home({handleChange, name}) {
  
  return (
    <>
      <div className="min-h-screen flex flex-col justify-start pt-28 items-center px-8">
        <h1 className="text-white text-3xl">Welcome to Sitting Position Detector</h1>
        <h1 className="text-white text-2xl font-bold py-3">Explore the Tech with fun</h1>

        <div className="text-lg flex-col flex justify-center items-centerspace-y-3 text-white gap-4 py-12 font-mono text-wrap">
          <input onChange={handleChange} type="text" className="border-2 text-black border-gray-300 px-5 py-1 rounded-md " placeholder="Enter Your Name" />
          <Link href={`/detect?name=${name}`} className="px-6 py-2 mx-auto w-fit text-center  border-2 border-white rounded-md hover:text-black hover:bg-white">
            Start 
          </Link>
         
        </div>

      </div>
    </>
  );
}
