import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase-client";
import logo from "../assets/unifest-light.png";
import EmailVerifyPage from "./EmailVerifyPage";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rMsg, setRMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function signUpNewUser(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      console.log(signUpError.message);
      setRMsg(signUpError.message);
    } else {
      const userId = signUpData.user.id;
      const emailId = signUpData.user.email;

      const { data: insertData, error: insertError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: userId,
            user_email: emailId,
          },
        ]);

      if (insertError) {
        setRMsg(insertError.message);
      } else {
        navigate("/email-verify", { state: { userEmail: emailId } });
        setEmail("");
        setPassword("");
      }
    }
    setIsSubmitting(false);
  }

  return (
    <main className="flex items-start justify-center min-h-screen bg-white">
      <div className="bg-transparent py-10 px-12 rounded-[12px] mt-10 m-4">
        <div className="text-center w-72">
          <div className="flex flex-col items-center justify-center mb-4">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
          <div className="flex flex-col items-center justify-center mb-4 mt-10">
            <h1 className="text-2xl font-medium">Create an account</h1>
            <p className="mt-1">Let's get started</p>
          </div>
          <form onSubmit={signUpNewUser}>
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
            <div className="mb-2">
              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="appearance-none border border-[#9D9D9D] rounded w-full py-3.5 px-3.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              {isSubmitting ? "Loading..." : "Sign up"}
            </button>
            <div>
              {rMsg && <div className="text-red-500 text-sm mt-2">{rMsg}</div>}
            </div>
          </form>

          <p className="mt-2">
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

export default SignUpPage;
