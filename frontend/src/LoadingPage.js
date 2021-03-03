import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingPage(searchTerm) {
  let loadingMsg;
  if (searchTerm.searchTerm.includes(",")) {
    loadingMsg = `Loading all interactions between ${searchTerm.searchTerm}...`;
  } else {
    loadingMsg = `Loading all high-severity interactions with ${searchTerm.searchTerm}...`;
  }
  return (
    <div>
      <p>{loadingMsg}</p>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingPage;
