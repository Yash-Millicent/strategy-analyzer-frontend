import React from "react";

const FancyErrorComponent = () => {
  return (
    <div className="error-container">
      <h1 className="error-heading">Error</h1>
      <img
        src="../../../../../public/media/auth/404-error.png"
        alt="Error"
        className="error-image"
        style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
      />
    </div>
  );
};

export default FancyErrorComponent;
