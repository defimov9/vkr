import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = React.memo(({ currentUser, loggedIn, signOut }) => {
  return (
    <>
      <Header
        email={currentUser.email}
        loggedIn={loggedIn}
        onSignOut={signOut}
      />
      <Outlet />
      <Footer />
    </>
  );
});

export default Layout;
