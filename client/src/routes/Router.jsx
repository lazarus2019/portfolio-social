import HomePage from "@/pages/HomePage/HomePage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import CreateProjectPage from "@/pages/ProjectPage/CreateProject/CreateProjectPage";
import DetailProjectPage from "@/pages/ProjectPage/DetailProject/DetailProjectPage";
import EditProjectPage from "@/pages/ProjectPage/EditProject/EditProjectPage";
import Login from "@/pages/User/Login/Login";
import Register from "@/pages/User/Login/Register";
import Profile from "@/pages/User/Profile/Profile";
import SettingPage from "@/pages/User/Setting/SettingPage";
import ForgotPasswordPage from "@/pages/VerifyNReset/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/VerifyNReset/ResetPasswordPage";
import VerifyAccountPage from "@/pages/VerifyNReset/VerifyAccountPage";
import React from "react";
import { Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";
import PrivateRoute from "./protected/PrivateRoute";
import VerifyRoute from "./protected/VerifyRoute";

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
        <Route path="verify-account/:token" element={<VerifyAccountPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="p/:slug" element={<DetailProjectPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="setting" element={<SettingPage />} />
          <Route path="profile" element="profile/setting" />
          <Route element={<VerifyRoute />}>
            <Route path="create-project" element={<CreateProjectPage />} />
            <Route path="edit-project/:id" element={<EditProjectPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
