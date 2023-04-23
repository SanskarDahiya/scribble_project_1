"use client";

import React, { useEffect } from "react";
import "./../src/css/bootstrap.min.css";
import "./../src/css/open-iconic-bootstrap.min.css";
import "./../src/css/animate.css";
import "./../src/css/owl.carousel.min.css";
import "./../src/css/owl.theme.default.min.css";
import "./../src/css/magnific-popup.css";
import "./../src/css/aos.css";
import "./../src/css/ionicons.min.css";
import "./../src/css/flaticon.css";
import "./../src/css/icomoon.css";
import "./../src/css/style.css";
import ToastModal from "toast-modal";

import { AppPropsType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useAppStore } from "../stores/AppStore";
import getFingerprint from "../helper/getFingerprint";
import { handleSSOUser } from "../helper/AxiosCall";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppPropsType) {
  const user = useAppStore((state) => state.user);
  const access_token = useAppStore((state) => state.access_token);
  let menuBar = [
    { name: "Home", link: "/" },
    { name: "Trends", link: "/trends" },
  ];

  if (user) {
    menuBar = [
      { name: "Home", link: "/" },
      { name: "My Messages", link: "/messages" },
      { name: "Trends", link: "/trends" },
    ];
  }
  useEffect(() => {
    if (access_token) {
      handleSSOUser();
    }
  }, [access_token]);
  useEffect(() => {
    useAppStore.getState().setIsLoading(true);
    getFingerprint()
      .then((res) => {
        useAppStore
          .getState()
          .setDeviceInfo({ ...res, deviceId: res.visitorId });
      })
      .finally(() => {
        const access_token = localStorage.getItem("access_token") || null;
        const refresh_token = localStorage.getItem("refresh_token") || null;
        if (!access_token) {
          useAppStore.getState().setIsLoading(false);
        }
        useAppStore.setState({ access_token, refresh_token });
      });
    const timer = setTimeout(() => {
      const libs = [
        "jquery.min.js",
        "jquery-migrate-3.0.1.min.js",
        "popper.min.js",
        "bootstrap.min.js",
        "jquery.easing.1.3.js",
        "jquery.waypoints.min.js",
        "jquery.stellar.min.js",
        "owl.carousel.min.js",
        "jquery.magnific-popup.min.js",
        "aos.js",
        "jquery.animateNumber.min.js",
        "scrollax.min.js",
        "main.js",
      ];
      libs.forEach((name) => {
        const elem = document.createElement("script") as HTMLScriptElement;
        elem.async = true;
        elem.id = name;
        elem.src = `/js/${name}`;
        if (!document.getElementById(name)) {
          const divElem = document.getElementById(
            "all_scripts"
          ) as HTMLDivElement;
          //FIXME:
          // divElem.appendChild(elem);
        }
      });
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="parentContainer">
      <Head>
        <title>Nazdeekiyaan</title>
        <meta name="description" content="Used to send anounomus messages." />
      </Head>
      <div className="bg-top navbar-light">
        <div className="container">
          <div className="row no-gutters d-flex align-items-center align-items-stretch">
            <div className="col-md-6 d-flex align-items-center py-4">
              <Link className="navbar-brand" href="/">
                <div style={{ color: "#5f5f5f" }}>NAZDEEKIYAAN</div>
              </Link>
            </div>
            {/* <LoginButtonWrapper {...props} /> */}
          </div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container d-flex align-items-center px-4">
          <button
            className="navbar-toggler collapsed"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const elem = document.getElementById(
                "ftco-nav"
              ) as HTMLDivElement | null;
              const thisElem = e.target as HTMLButtonElement;
              if (elem) {
                thisElem.classList.toggle("collapsed");
                elem.classList.toggle("show");
              }
            }}
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              {menuBar.map((elem, id) => (
                <li key={id} className="nav-item">
                  <Link href={elem.link} className="nav-link">
                    {elem.name}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                {user ? (
                  <div
                    className="nav-link "
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      useAppStore.getState().setUser(null);
                      useAppStore.setState({
                        messages: [],
                        access_token: null,
                        refresh_token: null,
                      });
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("refresh_token");
                    }}
                    role="presentation"
                  >
                    <span id="username1">Sign-Out: {user?.name}</span>
                  </div>
                ) : (
                  <Link href="/login" className="nav-link">
                    <span id="username">Login</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{
          zIndex: "1",
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: "2",
            height: "100%",
            width: "100%",
          }}
        >
          <ToastModal />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: "1",
            height: "100%",
            width: "100%",
          }}
        >
          <Component {...pageProps} />
        </div>
      </div>

      <footer
        className="ftco-footer ftco-bg-dark ftco-section"
        style={{ padding: "3rem 0", width: "100%" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>
                This Website Is Made With&nbsp;
                <i className="icon-heart" aria-hidden="true" />
                &nbsp;
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div id="all_scripts"></div>
    </div>
  );
}
