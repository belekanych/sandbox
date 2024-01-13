import TextInput from "../../components/form/TextInput";
import EmailInput from "../../components/form/EmailInput";
import PasswordInput from "../../components/form/PasswordInput.";
import GuestLayout from "../../components/layouts/GuestLayout";

function App() {
  return (
    <GuestLayout title="UI Library">
      <section>
        <h2>Forms</h2>
        <article>
          <h3>Text input</h3>
          <TextInput
            name={"textInput"}
            label="Name"
            value={""}
            onChange={() => {}}
          />
        </article>
        <article>
          <h3>Email input</h3>
          <EmailInput
            name={"emailInput"}
            label="Email"
            value={""}
            onChange={() => {}}
          />
        </article>
        <article>
          <h3>Password input</h3>
          <PasswordInput
            name={"passwordInput"}
            label="Password"
            value={""}
            onChange={() => {}}
          />
        </article>
      </section>
    </GuestLayout>
  );
}

export default App;
