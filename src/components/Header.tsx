'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
// import { Link } from "react-router-dom";
// import { whiteText } from "../customStyles";

const Header = (props: any) => {
  //   const router = useRouter()
  const handleForm = (e: any) => {
    e.preventDefault()
    return
  }
  // console.log(props, props.location.pathname.search("login"));
  // let loc = ('' + window.location).split('/').splice(0, 3).join('/')
  //   let isNotLoginPage = false
  //   if (props && props.location && props.location.pathname) {
  const isNotLoginPage =
    ((typeof window !== 'undefined' && window.location.href) || '').search(
      'login'
    ) === -1
  //   }
  return (
    <>
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          opacity: 0.4,
          zIndex:-1,
          minWidth: "109%",
          minHeight: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundImage: `url("${loc}/backgroundImage.jpg")`,
        }}
      /> */}
      <div className="bg-top navbar-light">
        <div className="container">
          <div className="row no-gutters d-flex align-items-center align-items-stretch">
            <div className="col-md-6 d-flex align-items-center py-4">
              <Link className="navbar-brand" href="/">
                <div style={{ color: '#5f5f5f' }}>NAZDEEKIYAAN</div>
              </Link>
            </div>
            <div className="col-md-6 d-block align-items-center py-4">
              <div className="row d-flex">
                {/* <div className="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                  <div className="icon d-flex justify-content-center align-items-center">
                    <span className="icon-phone2" />
                  </div>
                  <div className="text">
                    <span>Call</span>
                    <span>Call Us: {PHONENUMBER}</span>
                  </div>
                </div> */}
                {isNotLoginPage && <LoginButton {...props} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const LoginButton = (props: any) => {
  const userUpdater = props.userUpdate
  return (
    <>
      <div className="col-md d-flex align-items-center justify-content-end">
        <p>
          {props && props.user ? (
            <button
              onClick={() => {
                userUpdater(false)
              }}
              className="py-2 px-3 btn-primary d-flex align-items-center justify-content-center"
            >
              <span id="username1">
                signing off:{' '}
                {JSON.stringify((props.user && props.user.username) || {})}
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="py-2 px-3 btn-primary d-flex align-items-center justify-content-center"
            >
              <span id="username">Login</span>
            </Link>
          )}
        </p>
      </div>
    </>
  )
}

export default Header
