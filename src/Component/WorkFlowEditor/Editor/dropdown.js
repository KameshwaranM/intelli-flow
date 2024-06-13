import React from 'react';

const Sidebar = ({ data, onCategoryChange }) => {
  const categories = Object.keys(data[0]);

  return (
    <div style={{ width: '200px', background: '#f0f0f0' }}>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onCategoryChange(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
