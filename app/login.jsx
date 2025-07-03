import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../src/component/auth/Login";
import Registration from "../src/component/auth/Registration";

export default function LoginScreen() {
  const user = useSelector((state) => state.user);
  const [login, setLogin] = useState(true);
  console.log("userr",user);

  return (
    <>
        {login && <Login />}
        {!login && <Registration />}
    </>
  );
}
