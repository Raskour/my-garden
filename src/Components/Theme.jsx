import React from 'react';

const Theme = ({ handleTheme, theme }) => {
  return (
    <div className="button-container">
      <button className="themeButton" onClick={handleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Theme;
