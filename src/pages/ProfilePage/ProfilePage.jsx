import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import { useAuth } from "../../hooks/auth";
import { supabase } from "../../config/supabase-client";
import { TextField } from "@mui/material";

function ProfilePage() {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("profile");

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log("error", error.message);
    } else {
      setUserProfile(data);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    signOut();
  };

  const handleTransactionsClick = () => {
    setActiveButton("transactions");
    setShowTransactions(true);
  };

  const handleProfileClick = () => {
    setShowTransactions(false);
    setActiveButton("profile");
  };

  return user ? (
    <div className="min-h-screen bg-transparent flex items-start justify-center relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white ">
          <img src={spinner} />
        </div>
      )}
      <div className="w-full max-w-6xl bg-white rounded px-4 sm:px-6 lg:px-8 py-8 lg:py-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
        <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3">
          <div className="mt-0 sm:mt-0 p-2 shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-lg">
            <div className="border-0 rounded-xl">
              <div>
                <div className="flex-col items-center w-full">
                  <div
                    className={`focus:outline-none font-medium grow py-2.5 text-center rounded-sm sm:text-xs lg:text-base ${
                      activeButton === "profile"
                        ? "bg-[#EBE8FD]"
                        : "bg-transparent"
                    }`}
                  >
                    My Profile
                  </div>
                  <div
                    className={`flex items-center justify-center focus:outline-none text-black px-6 px-6 lg:px-11 py-2.5 rounded-sm cursor-pointer font-medium sm:text-xs lg:text-base ${
                      activeButton === "transactions"
                        ? "bg-[#EBE8FD]"
                        : "bg-transparent"
                    }`}
                  >
                    My Transactions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-9">
        <div className="mt-0 sm:mt-0 p-2 shadow-custom-light hover:shadow-custom-dark transition-shadow duration-300 rounded-lg min-h-52 bg-white px-6">
              <form className="space-y-4 mt-4">
                <TextField
                  label="Name"
                  type="text"
                  readOnly
                  value={userProfile.user_name ?? ""}
                  margin="dense"
                  id="outlined-size-small"
                  size="small"
                  className="ml-2"
                  required
                  fullWidth
                />
                <TextField
                  label="Email"
                  type="text"
                  readOnly
                  value={userProfile.user_email || ""}
                  margin="dense"
                  id="outlined-size-small"
                  size="small"
                  className="ml-2"
                  required
                  fullWidth
                />
                <TextField
                  label="Phone number"
                  type="tel"
                  readOnly
                  value={userProfile.user_mobileno || ""}
                  margin="dense"
                  id="outlined-size-small"
                  size="small"
                  className="ml-2"
                  required
                  fullWidth
                />
              </form>
              <div className="flex flex-col items-center justify-center w-full mt-4">
                <button
                  onClick={handleSignOut}
                  className="py-2 mt-2 mb-4 w-full text-white bg-red-500 rounded-sm cursor-pointer w-32"
                >
                  Sign Out
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Sign In Required</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>You need to sign in to access the profile page.</p>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
