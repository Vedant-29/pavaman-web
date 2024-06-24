import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailVerifyCompletePage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear interval when countdown reaches 0 and navigate to home page
    if (countdown === 0) {
      clearInterval(timer);
      navigate("/signin");
    }

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        <div className="text-lg flex items-center justify-center text-green-500 font-medium mb-3 px-6 py-4 shadow-custom-light relative">
          <div>Email Verification Complete</div>
        </div>
        <div className="flex flex-col items-center text-green-500 justify-center mb-4 px-6">
          <div className="text-center">
          Fantastic! Your email has been successfully verified. You'll be redirected to the sign-in page in {countdown} seconds. Welcome to unifest!
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifyCompletePage;
