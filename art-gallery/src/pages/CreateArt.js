import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateArt = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Title: '',
    Artist: '',
    Date: '',
    Gender: '',
    Nationality: '',
    ImageURL: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const isFormValid = () => {
    return (
      formData.Title.trim() &&
      formData.Artist.trim() &&
      formData.Date.trim() &&
      formData.Gender.trim() &&
      formData.Nationality.trim()
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form is valid before submission
    const payload = {
      Title: formData.Title,
      Artist: formData.Artist.split(',').map((a) => a.trim()),
      Date: formData.Date,
      Gender: [formData.Gender],
      Nationality: [formData.Nationality],
      ImageURL: formData.ImageURL
    };

    // Make API call to create new artwork
    try {
      const res = await axios.post('http://localhost:3001/api/arts', payload);
      const newArtId = res.data._id;
      alert('Artwork created! Redirecting to edit mode...');
      navigate(`/edit/${newArtId}`);
    } catch (err) { // Handle error
      console.error('Error creating artwork:', err);
      alert('Failed to create artwork.');
    }
  };

  return (
    <div className="container my-5">
      <h2>Add New Artwork</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            type="text"
            className="form-control"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Artist(s) * (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            name="Artist"
            value={formData.Artist}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date *</label>
          <input
            type="text"
            className="form-control"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender *</label>
          <select
            className="form-select"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nationality *</label>
          <input
            type="text"
            className="form-control"
            name="Nationality"
            value={formData.Nationality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="ImageURL"
            value={formData.ImageURL}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={!isFormValid()}
          style={{
            opacity: isFormValid() ? 1 : 0.5,
            cursor: isFormValid() ? 'pointer' : 'not-allowed'
          }}
        >
          Create
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateArt;
