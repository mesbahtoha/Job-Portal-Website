import { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-content font-semibold"
        : "text-base-content hover:bg-base-200"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          <HomeIcon />
          <span className="text-sm">Home</span>
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/myapplications" className={navLinkClass}>
            <ApplicationIcon />
            <span className="text-sm">My Applications</span>
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink to="/addjob" className={navLinkClass}>
            <AddJobIcon />
            <span className="text-sm">Add Job</span>
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink to="/mypostedjobs" className={navLinkClass}>
            <PostedJobIcon />
            <span className="text-sm">My Posted Jobs</span>
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-2 sm:px-4">
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden">
              <MenuIcon />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow-lg border border-base-300 space-y-1"
            >
              {links}
            </ul>
          </div>

          {/* Logo: icon always visible, text hidden on small screens (below sm) */}
          <NavLink to="/" className="btn btn-ghost text-xl font-bold text-primary px-2">
            <span className="mr-1 sm:mr-2">
              <LogoIcon />
            </span>
            <span className="hidden sm:inline">Career Code</span>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        <div className="navbar-end gap-1 sm:gap-2">
          {user ? (
            <button
              className="btn btn-outline btn-error btn-sm sm:btn-md"
              onClick={handleSignOut}
            >
              <LogoutIcon />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          ) : (
            <>
              <NavLink
                to="/register"
                className="btn btn-outline btn-primary btn-sm sm:btn-md"
              >
                <RegisterIcon />
                <span className="hidden sm:inline">Register</span>
              </NavLink>

              <NavLink to="/signin" className="btn btn-primary btn-sm sm:btn-md">
                <LoginIcon />
                <span className="hidden sm:inline">Sign In</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/* ---------- Icons (unchanged) ---------- */

const iconClass = "w-4 h-4";

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  );
}

function ApplicationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function AddJobIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
    </svg>
  );
}

function PostedJobIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-1 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12Z" />
    </svg>
  );
}

function RegisterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19a6 6 0 1 0-12 0m6-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 8v-6m-3 3h6" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5m5 5H3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14-5-5m0 0 5-5m-5 5h12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14 21 9l-9-5-9 5 9 5Zm0 0v6m-6-3h12" />
    </svg>
  );
}