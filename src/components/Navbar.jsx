import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import logo_dark from "../assets/kapil-logo.png";
import { FaShoppingCart } from "react-icons/fa";

function Navbar({isFixed}) {
  const { user } = useAuth();

  return (
    <nav className={`bg-[#C7DDF0] p-2.5 ${isFixed ? 'fixed top-0 w-full' : ''}`}>
      <div className="container mx-auto flex items-center justify-between flex-wrap px-4 sm:px-5">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Link to="/">
            <img src={logo_dark} alt="Logo" className="h-9" />{" "}
          </Link>
        </div>
        <div className="flex flex-row">
          {user ? (
            <>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="inline-block text-sm sm:text-md px-2 sm:px-4 py-2 sm:py-3 leading-none rounded font-bold text-[#E75A5A] sm:mt-0 mr-2 sm:mr-4"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-block text-sm sm:text-md px-2 sm:px-4 py-2 sm:py-3 leading-none rounded text-[#E75A5A] font-bold bg-[#FFD9D9] sm:mt-0 "
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
