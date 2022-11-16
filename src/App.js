import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useHistory,
} from "react-router-dom";
import "./App.css";

import { Auth } from "aws-amplify";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/verify">
          <Verify />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    Auth.signUp({
      username: email,
      password,
    })
      .then(() => {
        history.push("/verify");
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="email"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

function Verify() {
  const [code, setCode] = useState("");

  async function handleClick(event) {
    event.preventDefault();
    console.log(code);
    await Auth.signIn({});
  }
  return (
    <div>
      <h1>Verify</h1>
      <input
        type="text"
        placeholder="Verification Code"
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleClick}>Verify</button>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/signup">Sign Up</Link>
    </>
  );
}
