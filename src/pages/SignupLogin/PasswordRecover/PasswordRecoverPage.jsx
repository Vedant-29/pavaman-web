import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/kapil-logo.png";
import { supabase } from "../../../config/supabase-client";

function PasswordRecoverPage() {
  const [email, setEmail] = useState("");
  const [rMsg, setRMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const recoverEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRMsg("");

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setRMsg(error.message);
    } else {
      setRMsg(
        "Password recovery email has been sent. Please check your inbox."
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
            <h1 className="text-2xl font-medium">Recover your password</h1>
            <p className="mt-1">
              You'll receive an email to recover your password.
            </p>
          </div>
          <form onSubmit={recoverEmail}>
            <div className="mb-2">
              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
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
              {isSubmitting ? "Sending..." : "Send"}
            </button>
            <div>
              {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg w-96">
                    <div className="text-lg flex items-center justify-between font-medium mb-3 px-6 py-4 shadow-custom-light relative">
                      <div>Email has been sent</div>
                    </div>
                    <div className="flex flex-col items-center justify-center mb-4 px-6">
                      <div className="text-center">
                      We've sent an email to <strong>{email}</strong>. Click on the
                      link in the email to reset your password.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          <p className="mt-4">
            Already have an account?{" "}
            <NavLink to="/signin" className="text-blue-500 hover:text-blue-700">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </main>
  );
}

export default PasswordRecoverPage;
