import HomePage from "@/pages/HomePage/HomePage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import Login from "@/pages/User/Login/Login";
import Register from "@/pages/User/Login/Register";
import Profile from "@/pages/User/Profile/Profile";
import React from "react";
import { Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import PrivateRoute from "./protected/PrivateRoute";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="@:username" element={<Profile />} />
        <Route path="search" element="search" />
        {/* <Route path="/login" element="search" /> */}
        <Route path="verify-account/:token" element="verifyAccount" />
        <Route path="reset-password/:token" element="resetPassword" />
        <Route path="reset-password-form" element="resetPasswordForm" />
        <Route path="forget-password" element="forgetPassword" />

        <Route path="project">
          <Route index element="" />
          <Route path=":slug" element="" />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="setting" element="setting" />
          <Route path="profile" element="profile/setting" />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
