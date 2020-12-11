import React from 'react';

export const Item = ({ name, value }) => {
  return (
    <div className="item">
      {name}: {value}
    </div>
  );
};
