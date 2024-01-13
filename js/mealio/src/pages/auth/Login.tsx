import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import GuestLayout from "../../components/layouts/GuestLayout";
import Fieldset from "../../components/form/Fieldset";
import Button from "../../components/controls/Button";
import EmailInput from "../../components/form/EmailInput";
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
  const auth = useAuth();

  function submit(e: React.FormEvent) {
    console.log("submit");
    e.preventDefault();

    if (email === "" || password === "") {
      return;
    }

    auth && auth.login(email, password);
  }

  return (
    <GuestLayout title="Login" footer={<Footer />}>
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
        </Fieldset>
        <Button type="submit">Login</Button>
      </form>
    </GuestLayout>
  );
}

function Footer() {
  return (
    <>
      Don't have an account? <Link to="/register">Register</Link>
    </>
  );
}

export default App;
