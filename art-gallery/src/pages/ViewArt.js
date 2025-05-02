import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewArt = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [artList, setArtList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  // maintain the same state for filtered artworks
  useEffect(() => {
    if (location.state?.filteredArtworks) {
      setArtList(location.state.filteredArtworks);
      const index = location.state.filteredArtworks.findIndex((a) => a._id === id);
      setCurrentIndex(index);
      setLoading(false);
    } else {
      // If no filtered artworks, fetch the artwork by ID
      axios.get(`http://localhost:3001/api/arts/${id}`)
        .then(res => {
          setArtList([res.data]);
          setCurrentIndex(0);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching artwork:', err);
          setLoading(false);
        });
    }
  }, [id, location.state]);

  // Handle input changes for prescense or absence of filtered artworks
  if (loading) return <p className="text-center mt-5">Loading artwork...</p>;
  if (currentIndex === -1 || !artList.length) return <p className="text-center mt-5">Artwork not found.</p>;

  const art = artList[currentIndex];

  // Styles for the component
  const ancientStyle = {
    fontFamily: "'Times New Roman', serif",
    backgroundColor: '#fdf6e3',
    color: '#333',
    padding: '2rem',
    border: '4px double #444',
    boxShadow: 'inset 0 0 30px #c0c0c0',
    maxWidth: '1000px',
    margin: '2rem auto',
  };

  const tableStyle = {
    border: '2px solid #444',
    backgroundColor: '#fff8e1',
    width: '100%',
  };

  const thStyle = {
    width: '200px',
    border: '1px solid #666',
    backgroundColor: '#f2e6c0',
    padding: '0.5rem',
    fontWeight: 'bold',
  };

  const tdStyle = {
    border: '1px solid #666',
    padding: '0.5rem',
    whiteSpace: 'pre-wrap',
  };

  const buttonStyle = {
    backgroundColor: '#d2b48c',
    border: '2px outset #8b5e3c',
    color: '#000',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    minWidth: '120px',
  };

  // Function to render each row of the table
  const renderRow = (label, value) => (
    <tr key={label}>
      <th style={thStyle}>{label}</th>
      <td style={tdStyle}>
        {Array.isArray(value) ? value.join(', ') : value || '—'}
      </td>
    </tr>
  );

  // Function to handle navigation between artworks
  const goTo = (index) => {
    if (index >= 0 && index < artList.length) {
      setCurrentIndex(index);
      navigate(`/art/${artList[index]._id}`, {
        replace: true,
        state: { filteredArtworks: artList }
      });
    }
  };

  return (
    <div style={ancientStyle}>
      <h1 style={{ whiteSpace: 'pre-wrap', textAlign: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
        {art.Title || 'Untitled'}
      </h1>

      {art.ImageURL && (
        <div className="mb-4 text-center">
          <img
            src={art.ImageURL}
            alt={art.Title}
            style={{
              maxHeight: '400px',
              maxWidth: '100%',
              border: '3px solid #777',
              padding: '5px',
              backgroundColor: '#fff'
            }}
          />
        </div>
      )}

      <table style={tableStyle}>
        <tbody>
          {renderRow('Artist', art.Artist)}
          {renderRow('Gender', art.Gender)}
          {renderRow('Nationality', art.Nationality)}
          {renderRow('Artist Bio', art.ArtistBio)}
          {renderRow('Begin Date', art.BeginDate)}
          {renderRow('End Date', art.EndDate)}
          {renderRow('Date', art.Date)}
          {renderRow('Department', art.Department)}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-4">
        <button
          style={buttonStyle}
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ⬅ Previous
        </button>

        <button
          style={buttonStyle}
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === artList.length - 1}
        >
          Next ➡
        </button>
      </div>

      <div className="mt-4 text-center">
        <button style={{ ...buttonStyle, backgroundColor: '#c4a484' }} onClick={() => navigate('/')}>
          Back to Gallery
        </button>
      </div>
    </div>
  );
};

export default ViewArt;
