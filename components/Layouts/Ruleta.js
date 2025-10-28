import React from "react";

const Ruleta = ({ fn }) => {
  return (
    <div id="ruleta">
      <img
        className="ruleta"
        width="400"
        height="400"
        src="/img/ruleta.png"
        onClick={fn}
      />
    </div>
  );
};

export default Ruleta;
