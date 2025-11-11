import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTalents, filterBySkill } from '../redux/talentSlice';
import '../styles/TalentList.css';

const TalentList = () => {
  const dispatch = useDispatch();
  const { filteredTalents, loading, error } = useSelector(state => state.talents);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="talents-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading talents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="talents-container">
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="talents-container">
      <h2>Talent Directory</h2>
      
      {filteredTalents.length === 0 ? (
        <div className="empty-state">
          <p>No talents found. Add a new talent to get started!</p>
        </div>
      ) : (
        <>
          <p className="talent-count">
            Showing {filteredTalents.length} talent{filteredTalents.length !== 1 ? 's' : ''}
          </p>
          <div className="talents-grid">
            {filteredTalents.map(talent => (
              <div key={talent._id} className="talent-card">
                <div className="talent-header">
                  <h3>{talent.name}</h3>
                  <span className="experience-badge">
                    {talent.experience} {talent.experience === 1 ? 'year' : 'years'}
                  </span>
                </div>
                
                <div className="talent-body">
                  <p className="talent-email">
                    <strong>Email:</strong> {talent.email}
                  </p>
                  
                  <div className="skills-section">
                    <strong>Skills:</strong>
                    <div className="skills-container">
                      {talent.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="skill-tag clickable"
                          onClick={() => dispatch(filterBySkill(skill))}
                          title={`Filter by ${skill}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="talent-footer">
                  <small className="created-date">
                    Added: {new Date(talent.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TalentList;
