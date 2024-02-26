import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [name, setname] = useState('')
  const handleChange = (e) => {
    setname(e.target.value);
  }
  return (
    <>
      <Navbar />
      <Component {...pageProps} handleChange={handleChange} name={name}/>;
    </>
  )
}
