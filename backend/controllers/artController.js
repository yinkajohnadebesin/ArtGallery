const Art = require('../models/artModel');

// GET all artworks
exports.getAllArt = async (req, res) => {
  const arts = await Art.find();
  res.json(arts);
};

// GET one artwork
exports.getArtById = async (req, res) => {
  const art = await Art.findById(req.params.id);
  res.json(art);
};

// POST a new artwork
exports.createArt = async (req, res) => {
  const newArt = new Art(req.body);
  await newArt.save();
  res.status(201).json(newArt);
};

// PUT update an artwork
exports.updateArt = async (req, res) => {
  const updatedArt = await Art.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedArt);
};

// DELETE an artwork
exports.deleteArt = async (req, res) => {
  await Art.findByIdAndDelete(req.params.id);
  res.json({ message: 'Art deleted successfully' });
};
