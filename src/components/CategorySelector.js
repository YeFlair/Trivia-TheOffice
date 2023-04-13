import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div>
      <label htmlFor="category">Select a category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
