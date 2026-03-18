import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie animation/Register.json";
import { use, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";

const Register = () => {
  const { createUser, user, loading: authLoading } = use(AuthContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const result = await createUser(email, password);
      console.log(result.user);

      setSuccessMessage("Registration successful.");
      form.reset();

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
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
            animationData={registerLottie}
            loop={true}
          />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-base-300">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center">Register now!</h1>

            <form onSubmit={handleRegister} className="fieldset space-y-2">
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

              {errorMessage && (
                <p className="text-error text-sm mt-1">{errorMessage}</p>
              )}

              {successMessage && (
                <p className="text-success text-sm mt-1">{successMessage}</p>
              )}

              <button
                type="submit"
                className="btn btn-neutral mt-4"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <Link to="/signin" replace className="link link-primary">
                Sign In
              </Link>
            </p>

            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;