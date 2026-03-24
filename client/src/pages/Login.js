import { SignIn } from "@clerk/clerk-react";
import "./Auth.css";

function Login() {
  return (
    <div className="auth-container">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
      />
    </div>
  );
}

export default Login;