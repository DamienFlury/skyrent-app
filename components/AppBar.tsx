import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const AppBar = () => {
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    const jwtCookie = Cookies.get("jwt");
    if (jwtCookie) {
      setJwt(jwtCookie);
    }
  }, []);
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex items-center container mx-auto">
        <Link href="/">
          <a className="mr-4">Home</a>
        </Link>
        <Link href="/flats">
          <a className="m-4">Flats</a>
        </Link>
        <Link href="/contact">
          <a className="m-4">Contact</a>
        </Link>
        <span className="flex-1" />
        {jwt ? (
          <Link href="/settings">
            <a className="text-purple-600 rounded px-4 py-2 uppercase mr-2 hover:bg-purple-100 transition-colors duration-200">
              Settings
            </a>
          </Link>
        ) : (
          <Link href="/register">
            <a className="rounded px-4 py-2 uppercase mr-2 transition-colors duration-200">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default AppBar;
