import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import InputElement from "../components/Inputs/InputElement";
import { ErrorType } from "../types";
import { postRequest } from "../api/connection";

type LoginInfoType = {
  email: string;
  password: string;
};

function Login() {
  const [error, setError] = useState<ErrorType | null>(null);
  const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    dispatch({ type: "LOGOUT" });
    try {
      const logIn = await postRequest("/login", loginInfo);
      dispatch({
        type: "LOGIN",
        payload: {
          token: logIn.data.token,
          type: logIn.data.type,
        },
      });

      navigate("/app");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if ("response" in err && err.response.status === 401)
        setError({
          errorKey: "email",
          errorDescription: err.response.data.detail,
        });
      // eslint-disable-next-line no-console
      else console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, [name]: value }));
  };

  const handleReset = () => {
    setLoginInfo({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container w-1/3 mx-auto h-screen object-center relative flex flex-col content-center justify-center">
      <h1 className="text-4xl uppercase font-bold text-indigo-800 text-center pt-4">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <InputElement
          label="Email"
          error={error}
          inputType="email"
          inputName="email"
          required
          onChange={handleChange}
          value={"email" in loginInfo ? loginInfo.email : ""}
          enabled
        />
        <InputElement
          label="Password"
          error={error}
          inputType="password"
          inputName="password"
          required
          onChange={handleChange}
          value={"password" in loginInfo ? loginInfo.password : ""}
          enabled
        />

        <PrimaryButton
          buttonType="submit"
          text="Submit"
          onEvent={handleSubmit}
        />
        <SecondaryButton
          buttonType="reset"
          text="Reset"
          onEvent={handleReset}
        />
      </form>
    </div>
  );
}

export default Login;
