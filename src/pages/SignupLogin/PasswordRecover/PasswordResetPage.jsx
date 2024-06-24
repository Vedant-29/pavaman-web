import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase-client"; // Make sure you have supabase client setup in this file
import logo from "../assets/unifest-light.png";

function PasswordResetPage() {
  const [emailId, setEmailId] = useState("");
  const [pwd, setPwd] = useState("");

  const [rMsg, setRMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const recoverPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRMsg("");

    const { data, error } = await supabase.auth.updateUser({
      email: emailId,
      password: pwd,
    });

    if (error) {
      setRMsg(error.message);
    } else {
      setRMsg(
        "Password has been updated. Please sign in with your new password."
      );
      setShowPopup(true);
    }

    setIsSubmitting(false);
  };

  return (
    <main className="flex items-start justify-center min-h-screen bg-white">
      <div className="bg-transparent py-10 px-12 rounded-[12px] mt-10 m-4">
        <div className="text-center w-72">
          <div className="flex flex-col items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
          <div className="flex flex-col items-center justify-center mb-4 mt-10">
            <h1 className="text-2xl font-medium">Reset your password</h1>
            <p className="mt-1">
              Change the below email and password fields to move forward with
              signing in.
            </p>
          </div>
          <form onSubmit={recoverPassword}>
            <div className="mb-2">
              <input
                type="email"
                label="Email address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
                placeholder="Email address"
                className="appearance-none border min-w-72 border-[#9D9D9D] rounded w-full py-3.5 px-3.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                label="New password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
                placeholder="New password"
                className="appearance-none border min-w-72 border-[#9D9D9D] rounded w-full py-3.5 px-3.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-medium w-full py-3.5 px-3.5 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting
                  ? "bg-red-300 text-white"
                  : "bg-[#E75A5A] text-white"
              }`}
            >
              {isSubmitting ? "Loading..." : "Reset"}
            </button>
            <div>
              {rMsg && <div className="text-red-500 text-sm mt-2">{rMsg}</div>}
            </div>
            <div>
              {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-96">
                    <div className="text-lg flex items-center justify-between font-medium mb-3 px-6 py-4 shadow-custom-light relative">
                      <div>Password updated</div>
                    </div>
                    <div className="flex flex-col items-center justify-center mb-4 px-6">
                      <div className="text-center">
                        Password has been updated. Please sign in with your new
                        password.
                      </div>
                    </div>
                    <div className="flex justify-end px-6 pb-6 mt-4">
                      <div
                        className="focus:outline-none ml-2 w-full flex items-center justify-center bg-[#E75A5A] px-6 px-6 lg:px-11 py-2.5 text-white rounded-md cursor-pointer font-medium sm:text-xs lg:text-base"
                        onClick={() => navigate("/signin")}
                      >
                        Sign In
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default PasswordResetPage;
