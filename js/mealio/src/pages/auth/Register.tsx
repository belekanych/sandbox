import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import GuestLayout from "../../components/layouts/GuestLayout";
import Button from "../../components/controls/Button";
import EmailInput from "../../components/form/EmailInput";
import Fieldset from "../../components/form/Fieldset";
import PasswordInput from "../../components/form/PasswordInput.";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      return;
    }

    if (email === "" || password === "" || passwordConfirmation === "") {
      return;
    }

    if (auth) {
      await auth.signup(email, password);
      navigate("/");
    }
  }

  return (
    <GuestLayout title="Register" footer={<Footer />}>
      <form {...stylex.props(styles.form)} onSubmit={submit}>
        <Fieldset>
          <EmailInput
            name="email"
            label="Email"
            value={email}
            onChange={setEmail}
            required
          />
          <PasswordInput
            name="password"
            label="Password"
            value={password}
            onChange={setPassword}
            required
          />
          <PasswordInput
            name="passwordConfirmation"
            label="Confirm password"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            required
          />
        </Fieldset>
        <Button type="submit">Register</Button>
      </form>
    </GuestLayout>
  );
}

export default App;

function Footer() {
  return (
    <>
      Have an account? <Link to="/login">Login</Link>
    </>
  );
}
