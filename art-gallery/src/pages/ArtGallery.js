import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArtGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [yearRange, setYearRange] = useState([]);
  const [filters, setFilters] = useState({
    gender: '',
    nationality: '',
    beforeYear: '',
    afterYear: ''
  });

  const navigate = useNavigate();

  // Fetch artworks from the API
  useEffect(() => {
    axios.get('http://localhost:3001/api/arts')
      .then(res => {
        setArtworks(res.data);
        setLoading(false);
        const years = res.data
          .map((art) => parseInt(art.Date))
          .filter((y) => !isNaN(y));
        const currentYear = new Date().getFullYear();
        const minYear = Math.min(...years);
        const fullRange = Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i);
        setYearRange(fullRange);
      })
      // Handle errors
      .catch(err => {
        console.error('Error fetching artworks:', err);
        setLoading(false);
      });
  }, []);

  // Handle delete artwork
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/arts/${id}`);
      setArtworks(artworks.filter((art) => art._id !== id));
    } catch (err) {
      console.error('Error deleting artwork:', err);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      gender: '',
      nationality: '',
      beforeYear: '',
      afterYear: ''
    });
    setSearchTerm('');
  };

  // Filter artworks based on search term and filters
  const filteredArtworks = artworks.filter((art) => {
    const title = art.Title?.toLowerCase() || '';
    const artists = art.Artist?.join(', ').toLowerCase() || '';
    const gender = art.Gender?.join(', ').toLowerCase() || '';
    const nationality = art.Nationality?.join(', ').toLowerCase() || '';
    const date = parseInt(art.Date);

    const query = searchTerm.toLowerCase();
    const matchesSearch = title.includes(query) || artists.includes(query);

    const matchesGender = filters.gender ? gender.includes(filters.gender.toLowerCase()) : true;
    const matchesNationality = nationality.includes(filters.nationality.toLowerCase());
    const matchesBefore = filters.beforeYear ? date < parseInt(filters.beforeYear) : true;
    const matchesAfter = filters.afterYear ? date > parseInt(filters.afterYear) : true;

    return matchesSearch && matchesGender && matchesNationality && matchesBefore && matchesAfter;
  });

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Art Gallery</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Title or Artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Box */}
      <div className="card p-3 mb-4">
        <h5>Filter Artworks</h5>
        <div className="row g-3">
          <div className="col-md-2">
            <select
              className="form-select"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="nationality"
              placeholder="Filter by Nationality"
              value={filters.nationality}
              onChange={handleFilterChange}
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              name="beforeYear"
              value={filters.beforeYear}
              onChange={handleFilterChange}
            >
              <option value="">Before Year</option>
              {yearRange.map((year) => (
                <option key={`b-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              name="afterYear"
              value={filters.afterYear}
              onChange={handleFilterChange}
            >
              <option value="">After Year</option>
              {yearRange.map((year) => (
                <option key={`a-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="col-md-1 d-grid">
            <button
              className="btn"
              onClick={handleResetFilters}
              style={{ backgroundColor: 'orange', color: 'black', fontWeight: 'bold' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Art Cards */}
      {loading ? (
        <p className="text-center">Loading artworks...</p>
      ) : filteredArtworks.length === 0 ? (
        <p className="text-center">No artworks match your search or filters.</p>
      ) : (
        <div className="row g-4">
          {filteredArtworks.map((art) => (
            <div key={art._id} className="col-md-4">
              <div
                className="card h-100 shadow-sm"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/art/${art._id}`, { state: { filteredArtworks } })}
              >
                {art.ImageURL && (
                  <img
                    src={art.ImageURL}
                    className="card-img-top"
                    alt={art.Title}
                    style={{ objectFit: 'cover', maxHeight: '200px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{art.Title}</h5>
                  <p className="card-text"><strong>Artist:</strong> {art.Artist?.join(', ')}</p>
                  <p className="card-text"><strong>Gender:</strong> {art.Gender?.join(', ')}</p>
                  <p className="card-text"><strong>Nationality:</strong> {art.Nationality?.join(', ')}</p>
                  <p className="card-text"><strong>Date:</strong> {art.Date}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${art._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(art._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtGallery;
