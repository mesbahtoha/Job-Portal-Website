import { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo =
    from || location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      console.log(result.user);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);
      setErrorMessage("Google sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="divider">OR</div>

      {errorMessage && (
        <p className="text-error text-sm mb-3 text-center">
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="btn bg-white text-black border-[#e5e5e5] w-full"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>

        {loading ? "Signing in..." : "Login with Google"}
      </button>
    </div>
  );
};

export default SocialLogin;