import React from "react";
import AuthHeader from "./AuthHeader";
import { Link, useNavigate } from "react-router-dom";
import AuthFormInput from "./AuthFormInput";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import * as UserService from "../../services/UserService";

// import { useMutationHooks } from "../../hooks/useMutationHooks";
export default function AuthContainer({ title }) {
  // const mutation = useMutationHooks((data) => UserService.loginUser(data));
  // console.log("mutation", mutation);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    // Store user details in localStorage
    // const newAccount = [...listAccount, { email: email, password: password }];
    // localStorage.setItem("listAccount", JSON.stringify(newAccount));
    alert("Đăng ký thành công!");
  };

  const handleLogin = () => {
    // const storedAccounts = JSON.parse(localStorage.getItem("listAccount"));
    // const foundAccount = storedAccounts.find(
    //   (account) => account.email === email && account.password === password
    // );
    // if (foundAccount) {
    //   navigate("/"); // Điều chỉnh đường dẫn tới trang chủ của bạn
    // } else {
    //   alert("Email hoặc mật khẩu không đúng!");
    // }
  };

  return (
    <div>
      <form
        className="container-login"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="modal__body">
          <div className="auth-form">
            <div className="auth-form__container">
              <div className="auth-form__header">
                <h3 className="authen-form__heading">
                  {title === "Đăng ký" ? (
                    <Link to="/signup">Đăng ký</Link>
                  ) : (
                    <Link to="/login">Đăng nhập</Link>
                  )}
                </h3>
              </div>

              <div className="auth-form__form">
                <AuthFormInput
                  value={email}
                  placeholder="Nhập email"
                  onChange={handleEmailChange}
                />
                <AuthFormInput
                  type="password"
                  value={password}
                  placeholder="Nhập mật khẩu"
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                />
                {title === "Đăng ký" && (
                  <AuthFormInput
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    autoComplete="new-password"
                  />
                )}
              </div>

              <div className="auth-form__aside">
                <p className="auth-form__policy-text">
                  Bằng việc đăng ký, bạn có đồng ý
                  <a href="/" className="auth-form__policy-link">
                    Điều khoản dịch vụ{" "}
                  </a>
                  &
                  <a href="/" className="auth-form__policy-link">
                    Chính sách bảo mật
                  </a>
                </p>
              </div>
              {title === "Đăng nhập" ? (
                <div className="auth-form__account">
                  <span>Bạn chưa có tài khoản ? </span>
                  <Link to="/signup">Đăng Ký</Link>
                </div>
              ) : (
                <div className="auth-form__account">
                  <span>Bạn đã có tài khoản ? </span>
                  <Link to="/login">Đăng nhập</Link>
                </div>
              )}

              <div className="auth-form__controls">
                <button className="btn auth-form__controls-back btn-normal">
                  Trở lại
                </button>
                {title === "Đăng nhập" ? (
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Đăng nhập
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button className="btn btn-primary" onClick={handleSignUp}>
                      Đăng ký
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
