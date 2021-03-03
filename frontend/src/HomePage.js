import React from "react";
import { useSelector } from "react-redux";
import LoggedInHome from "./LoggedInHome";

function HomePage() {
  const currentUser = useSelector((st) => st.currentUser);
  // for users who are logged in but have no drugs saved
  if (
    currentUser.isLoggedIn &&
    currentUser.currentUser.savedDrugs.length === 0
  ) {
    return (
      <div>
        <h1>
          Welcome to the Drug Interaction Hub,{" "}
          {currentUser.currentUser.username}
        </h1>
        <p>you haven't saved any medications yet!</p>
      </div>
    );
  }

  return (
    <div>
      {currentUser.isLoggedIn ? (
        <LoggedInHome currentUser={currentUser} />
      ) : (
        <div>
          <h2>Welcome to the Drug Interaction Hub</h2>
          <h4>log in or sign up to see your saved medications</h4>
        </div>
      )}
      <h6 muted>
        disclaimer: this site can not provide specific medical advice, and is
        only intended to provide more information to users. please consult with
        a physician before making medical decisions.
      </h6>
    </div>
  );
}

export default HomePage;
