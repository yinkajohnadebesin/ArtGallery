import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditArt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the specific artwork data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3001/api/arts/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load artwork:', err);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    autoResize(e.target);
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Artist' || name === 'Gender' || name === 'Nationality'
        ? value.split(',').map(v => v.trim())
        : value
    }));
  };

  // Auto-resize the textarea based on content
  const autoResize = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/arts/${id}`, formData);
      alert('Artwork updated!');
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update artwork.');
    }
  };

  // Render loading state or form if data is not present
  if (loading || !formData) return <p className="text-center mt-5">Loading...</p>;

  const inputStyle = {
    border: '1px dotted #999',
    backgroundColor: '#fff',
    padding: '8px',
    width: '100%',
    resize: 'none',
    overflow: 'hidden',
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap'
  };

  // Render input fields to make available for editing
  const renderInput = (label, name) => (
    <div className="mb-3" key={name}>
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        className="form-control"
        style={inputStyle}
        value={
          Array.isArray(formData[name])
            ? formData[name].join(', ')
            : formData[name] || ''
        }
        onChange={handleChange}
        onInput={(e) => autoResize(e.target)}
        rows={1}
      />
    </div>
  );

  return (
    <div className="container my-5">
      <h2>Edit Artwork</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Side: Inputs */}
          <div className="col-md-6">
            {renderInput('Title', 'Title')}
            {renderInput('Artist(s)', 'Artist')}
            {renderInput('Gender(s)', 'Gender')}
            {renderInput('Nationality', 'Nationality')}
            {renderInput('Medium', 'Medium')}
            {renderInput('Artist Bio', 'ArtistBio')}
            {renderInput('Begin Date', 'BeginDate')}
            {renderInput('End Date', 'EndDate')}

            <div className="mt-4 d-flex gap-3">
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Cancel
              </button>
            </div>
          </div>

          {/* Right Side: Image Preview + Image URL */}
          <div className="col-md-6 text-center">
            <h5>Image Preview</h5>
            {formData.ImageURL ? (
              <img
                src={formData.ImageURL}
                alt="Art Preview"
                className="img-fluid rounded shadow mb-3"
                style={{ maxHeight: '400px' }}
              />
            ) : (
              <p className="text-muted">No image provided.</p>
            )}

            <div className="px-3">
              {renderInput('Image URL', 'ImageURL')}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditArt;
