import React from 'react';

const Button = ({ onClick, isLoading, value, backgroundColor }) => {

    const style = {
        backgroundColor: backgroundColor,
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        width: '100px',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
    };

  return (
    <button onClick={onClick} style={style} disabled={isLoading}>
      {isLoading ? 'Loading...' : value}
    </button>
  );
};

export default Button;
