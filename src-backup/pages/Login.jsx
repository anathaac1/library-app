import { useEffect, useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // ============================
  // SLIDESHOW
  // ============================

  const libraryImages = [
    "/1.png",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % libraryImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [libraryImages.length]);

  // ============================
  // LOGIN
  // ============================

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const users = [
      {
        username: "admin",
        password: "admin123",
        role: "admin",
      },
      {
        username: "pegawai",
        password: "pegawai123",
        role: "pegawai",
      },
    ];

    const user = users.find(
      (item) =>
        item.username === username &&
        item.password === password
    );

    if (!user) {
      setError("Invalid username or password.");
      return;
    }

    const userData = {
      username: user.username,
      role: user.role,
      rememberMe: rememberMe,
    };

    localStorage.setItem(
      "libraryUser",
      JSON.stringify(userData)
    );

    onLogin(userData);
  };

  // ============================
  // LEARN MORE
  // ============================

  const handleLearnMore = () => {
    document.getElementById("username")?.focus();

    setError("Please log in first to access Library App.");
  };

  return (
    <div className="login-page">

      {/* ============================
          LEFT - SLIDESHOW
      ============================ */}

      <section className="login-visual">

        {libraryImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt="Library"
            className={`library-slide ${
              index === currentImage ? "active" : ""
            }`}
          />
        ))}

        <div className="image-overlay"></div>

        <div className="visual-content">

          <span className="visual-small-title">
            LIBRARY MANAGEMENT
          </span>

          <h1>Library App</h1>

          <div className="visual-line"></div>

          <p>
            Manage your library collection and
            transactions easily, efficiently,
            and in an organized way.
          </p>

          <button
            type="button"
            className="learn-more-button"
            onClick={handleLearnMore}
          >
            Learn more
            <span>→</span>
          </button>

        </div>

        {/* SLIDE INDICATOR */}

        <div className="slide-indicator">

          {libraryImages.map((_, index) => (
            <span
              key={index}
              className={
                index === currentImage
                  ? "active"
                  : ""
              }
            ></span>
          ))}

        </div>

      </section>


      {/* ============================
          RIGHT - LOGIN
      ============================ */}

      <section className="login-form-section">

        <div className="login-container">

          <div className="login-header">

            <span className="login-brand">
              LIBRARY APP
            </span>

            <h2>Welcome!</h2>

            <p>
              Log in your account to access library app.
            </p>

          </div>


          <form
            onSubmit={handleLogin}
            autoComplete="off"
          >

            {/* USERNAME */}

            <div className="form-group">

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                autoComplete="new-password"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert("Forgot password feature")
                  }
                >
                  Forgot password?
                </button>

              </div>


              <div className="password-input-wrapper">

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  autoComplete="new-password"
                  required
                />


                {/* ============================
                    EYE BUTTON
                ============================ */}

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (

                    /* EYE OPEN */

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />
                    </svg>

                  ) : (

                    /* EYE CLOSED */

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3l18 18" />

                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />

                      <path d="M9.9 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.3 17.3 0 0 1-3.1 3.9" />

                      <path d="M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4.1-.8" />
                    </svg>

                  )}

                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}


            {/* REMEMBER ME */}

            <div className="remember-wrapper">

              <label className="remember-label">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>


          {/* FOOTER */}

          <div className="login-footer">

            <span>────</span>

            <p>
              2026 Library App.
            </p>

            <span>────</span>

            <span className="footer-decoration">
              ִֶָ. ..𓂃 ࣪ ִֶ
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;