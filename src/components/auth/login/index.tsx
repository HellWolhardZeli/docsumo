import { useState } from "react";
import { signIn } from "../../../services/auth";
import styles from "./styles.module.css";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [data, setData] = useState({ error: "", message: "" });
  const [loading, setLoading] = useState(false);
  // const [passwordError, setPasswordError] = useState("");

  const passwordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const isValidEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (isValidEmail) {
      setValidEmail(true);
      setLoading(true);
      signIn(email, password).then(({ data }) => {
        setData(data);
        const userData = JSON.stringify(data.user);
        localStorage.setItem("currentUser", userData);
        setLoading(false);
        window.location.href = "/welcome";
      });
    } else {
      setValidEmail(false);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logoAnchor}>
            <img
              className={styles.logo}
              src="https://app.docsumo.com/static/images/docsumo-logo.1a785f0ecf111285ae69.png"
              alt="Docsumo"
            />
          </a>
        </div>
        <div className={styles.loginContainer}>
          <h1 className={styles.heading}>Login to your Docsumo account</h1>
          {data?.error && (
            <div className={styles.serverError}>
              {data.error} <br />
              {data.message}
            </div>
          )}
          <div className={styles.formContainer}>
            <form onSubmit={(e) => onFormSubmit(e)}>
              <div className={styles.inputContainer}>
                <div className={styles.formHeading}>Work Email</div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id=""
                    placeholder="janedoe@abc.com"
                    className={`${styles.formInput} ${
                      !validEmail && styles.invalidInput
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!validEmail && (
                    <div className={styles.invalidEmail}>
                      Please enter a valid email address
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.formHeading}>Password</div>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id=""
                    placeholder="Enter password here..."
                    className={styles.formInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    title={showPassword ? "Hide Password" : "Show Password"}
                    className={styles.passwordVisibilityToggle}
                    onClick={passwordVisibilityToggle}
                  >
                    <svg width="19" height="11" fill="none">
                      <path
                        d="M9.388 0C5.891 0 2.742 1.741.538 4.521a.915.915 0 0 0 0 1.138c2.204 2.78 5.353 4.522 8.85 4.522s6.646-1.741 8.85-4.522a.915.915 0 0 0 0-1.138C16.034 1.741 12.885 0 9.388 0zm0 7.953a2.862 2.862 0 1 1 0-5.725 2.862 2.862 0 0 1 0 5.725z"
                        fill={showPassword ? "#405089" : "#8D8D8D"}
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className={styles.forgotPassword}>
                <a
                  title="Forgot Password?"
                  href="https://app.docsumo.com/reset-password"
                >
                  Forgot Password?
                </a>
              </div>
              <div className={styles.loginButtonContainer}>
                <button
                  className={styles.loginButton}
                  title=""
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
          <div className={styles.signupButtonContainer}>
            <span>Don't have an account?</span>&nbsp;&nbsp;
            <a href="https://app.docsumo.com/signup/">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
