import HomePage from "@/pages/HomePage/HomePage";
import React from "react";
import { Route, Routes } from "react-router";
import PrivateRoute from "./protected/PrivateRoute";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/@:username" element="profile" />
      <Route path="/search-user" element="searchUser" />
      <Route path="/search-project" element="searchProject" />
      <Route path="/verify-account/:token" element="verifyAccount"/>
      <Route path="/reset-password/:token" element="resetPassword" />
      <Route path="/reset-password-form" element="resetPasswordForm" />

      <Route path="/project">
          <Route index element="" />
          <Route path=":slug" element="" />
      </Route>

      <Route path="/" element={<PrivateRoute />}>
        <Route path="setting" element="setting" />
        <Route path="profile" element="profile/setting" />
      </Route>
      <Route path="*" element="notfound" />
    </Routes>
  );
}

export default Router;
