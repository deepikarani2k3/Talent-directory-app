import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTalent, clearError, clearSuccessMessage } from '../redux/talentSlice';
import '../styles/TalentForm.css';

const TalentForm = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(state => state.talents);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Please enter name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter email');
      return;
    }
    if (!formData.skills.trim()) {
      alert('Please enter at least one skill');
      return;
    }
    if (!formData.experience || formData.experience < 0 || formData.experience > 70) {
      alert('Please enter valid experience (0-70 years)');
      return;
    }

    const skillsArray = formData.skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (skillsArray.length === 0) {
      alert('Please enter at least one skill');
      return;
    }

    const talentData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      skills: skillsArray,
      experience: parseInt(formData.experience)
    };

    dispatch(addTalent(talentData)).then((result) => {
      if (result.type === 'talents/addTalent/fulfilled') {
        setFormData({
          name: '',
          email: '',
          skills: '',
          experience: ''
        });
        setTimeout(() => {
          dispatch(clearSuccessMessage());
        }, 3000);
      }
    });
  };

  return (
    <div className="talent-form-container">
      <div className="form-card">
        <h2>Add New Talent</h2>
        
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
            <button 
              className="close-btn" 
              onClick={() => dispatch(clearSuccessMessage())}
            >
              ✕
            </button>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
            <button 
              className="close-btn" 
              onClick={() => dispatch(clearError())}
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills * (comma-separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
              disabled={loading}
            />
            <small>Enter skills separated by commas</small>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Years of Experience *</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter years of experience"
              min="0"
              max="70"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Talent'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TalentForm;
