import { useState } from "react";
import Login from "../src/component/auth/Login";
import Registration from "../src/component/auth/Registration";

export default function LoginScreen() {
  const [login, setLogin] = useState(true);

  return (
    <>
        {login && <Login />}
        {!login && <Registration />}
    </>
  );
}
