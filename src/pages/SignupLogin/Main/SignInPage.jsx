import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/kapil-logo.png";
import { supabase } from "../../../config/supabase-client";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rMsg, setRMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function signInWithEmail(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setRMsg(error.message);
    } else {
      const { data: userData, error: userError } = await supabase
        .from("admin_users")
        .select("admin_subrole")
        .eq("email", email)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError.message);
        navigate("/");
      } else {
        if (userData && userData.admin_subrole === "pending") {
          // Redirect the user to the admin page
          navigate("/employee-list");
        } else {
          // Redirect the user to the homepage
          navigate("/admin");
        }
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
            <h1 className="text-2xl font-medium">Welcome Back</h1>
            <p className="mt-1">Welcome Let's dive in.</p>
          </div>
          <form onSubmit={signInWithEmail}>
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

            <div className="mb-1">
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
            <div className="text-right mb-4">
              <NavLink
                to="/password-recover"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Forgot Password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`font-medium w-full py-3.5 px-3.5 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting
                  ? "bg-blue-300 text-white"
                  : "bg-[#4880FF] text-white"
              }`}
            >
              {isSubmitting ? "Loading..." : "Sign in"}
            </button>
            {rMsg && <div className="text-red-500 text-sm mt-2">{rMsg}</div>}
          </form>

          <p className="mt-4">
            Create an account?{" "}
            <NavLink to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
