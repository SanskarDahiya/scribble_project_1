"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createUser, validateLogin } from "../helper/AxiosCall";
import FormWrapper from "custom-form-hook";
import { useAppStore } from "../stores/AppStore";
import { useRouter } from "next/router";
import { setError } from "toast-modal";
import { encrypt } from "../helper/encrypt";
import { Button } from "ui";

const Login = () => {
  const [error, errorUpdater] = useState<string | null>(null);
  const [isLogin, isLoginUpdater] = useState(true);
  const errorUpdater_ = (x: string) => errorUpdater(x);
  const SwitchLogin = () => {
    isLoginUpdater(!isLogin);
  };
  const user = useAppStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    // setInfo("this is toast", 50000);

    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="container-fluid h-custom">
      {/* <Button /> */}
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          {error && (
            <ErrorScreen error={error} onClick={() => errorUpdater(null)} />
          )}

          {isLogin ? (
            <LoginWrapper
              errorUpdater={errorUpdater_}
              SwitchLogin={SwitchLogin}
            />
          ) : (
            <Signup errorUpdater={errorUpdater_} SwitchLogin={SwitchLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginWrapper = (props: any) => {
  const onFormSubmit = async (data: any) => {
    const { username, password } = data;
    if (
      !username ||
      !password ||
      !username.trim() ||
      !password.trim() ||
      username.trim().length <= 3 ||
      password.trim().length <= 3
    ) {
      throw new Error("Invalid Username or Password");
    }
    const passwordHash = await encrypt(password.trim());
    try {
      const resp = await validateLogin({
        username: username.trim(),
        password: passwordHash,
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || "something went wrong";
      setError(message);
      throw new Error(message);
    }
  };
  return (
    <>
      <br />
      <h3>Sign In</h3>
      <FormWrapper
        onFormSubmit={onFormSubmit}
        inputs={[
          {
            name: "username",
            inputField: {
              placeholder: "Enter Username",
              type: "text",
            },
            formFields: {
              required: true,
              min: 3,
              minLength: 3,
            },
          },
          {
            name: "password",
            inputField: {
              placeholder: "Enter Password",
              type: "password",
            },
            formFields: {
              required: true,
              min: 3,
              minLength: 3,
            },
          },
        ]}
      />
      <p className="forgot-password text-right">
        Forgot <Link href="/contact">password? Contact Admin</Link>
      </p>
      <p className="forgot-password text-right">
        Don&apos;t have an account{" "}
        <Link href="/login#signup" onClick={props.SwitchLogin}>
          sign up?
        </Link>
      </p>
    </>
  );
};

export default Login;

const Signup = (props: any) => {
  const onFormSubmit = async (data: any) => {
    const { username, password, email } = data;
    if (
      !username ||
      !password ||
      !email ||
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      username.trim().length <= 3 ||
      password.trim().length <= 3
    ) {
      throw new Error("Invalid Username or Password or Email");
    }
    const passwordHash = await encrypt(password.trim());
    try {
      const resp = await createUser({
        email: email.trim(),
        username: username.trim(),
        password: passwordHash,
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || "something went wrong";
      throw new Error(message);
    }
  };

  return (
    <div>
      <br />
      <h3>Sign Up</h3>
      <FormWrapper
        onFormSubmit={onFormSubmit}
        inputs={[
          {
            name: "username",
            label: "Enter Username *will be used to login",
            inputField: {
              type: "text",
            },
            formFields: {
              required: true,
              min: 3,
              minLength: 3,
            },
          },
          {
            name: "email",
            inputField: {
              placeholder: "Enter Email",
              type: "email",
            },
            formFields: {
              required: true,
              min: 3,
              minLength: 3,
            },
          },
          {
            name: "password",
            inputField: {
              placeholder: "Enter Password",
              type: "password",
            },
            formFields: {
              required: true,
              min: 3,
              minLength: 3,
            },
          },
        ]}
      />
      <p className="forgot-password text-right">
        Already registered{" "}
        <Link href="/login" onClick={props.SwitchLogin}>
          sign in?
        </Link>
      </p>
    </div>
  );
};

const ErrorScreen = (props: any) => {
  const onClick = props.onClick;
  let error = props.error;
  if (!onClick || !error || !(error instanceof Object)) {
    console.error("Provide onClick ");
    return <></>;
  }

  return (
    <div>
      <div className={"wrapper"}>
        <div className={"container"}>
          <div
            style={{
              zIndex: 10000,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                border: "0px solid red",
                minHeight: 100,
                minWidth: 100,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>Warning!</div>
              <div>{error.name || ""}</div>
              <div>{error.message || ""}</div>
              <div>
                <button
                  type="submit"
                  onClick={onClick}
                  className="btn-primary btn-block"
                  style={{
                    borderRadius: 5,
                    border: "0px solid red",
                    padding: "12 18",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
