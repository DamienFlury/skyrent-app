import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useJwt = () => {
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    const jwtCookie = Cookies.get("jwt");
    if (jwtCookie) {
      setJwt(jwtCookie);
    }
  }, []);

  return jwt;
};

export default useJwt;
