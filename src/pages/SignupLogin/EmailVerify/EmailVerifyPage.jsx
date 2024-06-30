import React, { useState } from "react";
import logo from "../../../assets/kapil-logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function EmailVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state.userEmail;

    
  return (
    <main className="flex items-start justify-center min-h-screen bg-white">
      <div className="bg-transparent py-10 px-12 rounded-[12px] mt-10 m-4">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
          <div className="flex flex-col items-center justify-center mb-4 mt-10">
            <h1 className="text-2xl font-medium">Verify your email</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="mt-2 w-96">
              We've sent an email to <strong>{userEmail}</strong>. Click on the
              link in the email to sign in.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="font-medium mt-4 w-72 py-3.5 px-3.5 rounded focus:outline-none focus:shadow-outline bg-[#E75A5A] text-white"
            >
              Change email
            </button>
            <p className="mt-4 text-gray-500">
              Didn't get a confirmation email?
            </p>
            <p className="text-gray-500">
              Check your spam folder or change email
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EmailVerifyPage;
