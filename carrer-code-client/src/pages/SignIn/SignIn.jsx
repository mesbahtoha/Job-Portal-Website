import Lottie from "lottie-react";
import signInLottie from "../../assets/lottie animation/Login and Sign up.json";
import { use, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";

const SignIn = () => {
  const { signInUser, user, loading: authLoading } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, from]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setErrorMessage("");
    setLoading(true);

    try {
      const result = await signInUser(email, password);
      console.log(result.user);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMessage("Incorrect email or password.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage("Too many failed attempts. Try again later.");
      } else {
        setErrorMessage("Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen px-4">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "220px" }}
            animationData={signInLottie}
            loop={true}
          />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-base-300">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center">Sign In now!</h1>

            <form onSubmit={handleSignIn} className="fieldset space-y-2">
              <div>
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              {errorMessage && (
                <p className="text-error text-sm mt-1">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="btn btn-neutral mt-4"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link to="/register" replace className="link link-primary">
                Register
              </Link>
            </p>

            <SocialLogin from={from} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;