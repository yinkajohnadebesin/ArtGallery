const fs = require('fs');
const path = require('path');
const Art = require('./models/artModel');

// This function seeds the database with artwork data from a JSON file
const seedDatabase = async () => {
  try {
    // For Dr. Luis Miralles
    // you can comment or uncomment the next line to use the temp.json or Artworks.json file yourself
    
    const filePath = path.join(__dirname, 'temp.json');
    // const filePath = path.join(__dirname, 'Artworks.json');

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const artworks = JSON.parse(rawData);

    // Check if the database is empty before seeding
    const count = await Art.countDocuments();
    if (count === 0) {
      await Art.insertMany(artworks);
      console.log('Artworks fed into database');
    } else {
      console.log('Artworks already exist — skipping seed');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
