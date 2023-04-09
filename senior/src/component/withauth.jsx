import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    useEffect(() => {
      if (!cookies.jwt) {
        navigate("/login");
      }
    }, [cookies.jwt, navigate]);

    return <Component {...props} token={cookies.token} />;
  };
};

export default withAuth;
