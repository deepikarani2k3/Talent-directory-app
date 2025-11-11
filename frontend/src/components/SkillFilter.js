import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterBySkill } from '../redux/talentSlice';
import '../styles/SkillFilter.css';

const SkillFilter = () => {
  const dispatch = useDispatch();
  const { currentFilter } = useSelector(state => state.talents);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(filterBySkill(value));
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    dispatch(filterBySkill(''));
  };

  return (
    <div className="skill-filter-container">
      <div className="filter-card">
        <h3>Filter by Skill</h3>
        <div className="filter-input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleFilterChange}
            placeholder="Search by skill (e.g., React, Node.js)..."
            className="filter-input"
          />
          {searchTerm && (
            <button onClick={handleClearFilter} className="clear-btn">
              Clear
            </button>
          )}
        </div>
        {currentFilter && (
          <p className="filter-status">
            Filtering by: <strong>{currentFilter}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillFilter;
