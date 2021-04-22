import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import useJwt from "../hooks/useJwt";

type Props = {
  className?: string;
};

const AppBar = ({ className }: Props) => {
  const jwt = useJwt();
  return (
    <nav className={`sticky top-0 bg-white z-20 ${className}`}>
      <div className="flex items-center container mx-auto">
        <Link href="/">
          <a className="mr-4">Home</a>
        </Link>
        <Link href="/flats">
          <a className="m-4">Flats</a>
        </Link>
        <Link href="/travel-tips">
          <a className="m-4">Travel Tips</a>
        </Link>
        <Link href="/contact">
          <a className="m-4">Contact</a>
        </Link>
        <span className="flex-1" />
        {jwt ? (
          <button
            className="text-purple-600 rounded px-4 py-2 uppercase mr-2 hover:bg-purple-100 transition-colors duration-200"
            onClick={() => Cookies.remove("jwt")}
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
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
