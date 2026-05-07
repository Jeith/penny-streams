const express = require('express');
const router = express.Router();
const mockData = require('../data/mock-data.json');

router.get('/get-access-token', function(req, res) {
  return res.json({ access_token: 'mock-token' });
});

router.get('/search-artists/:artist', function(req, res) {
  const artistQuery = (req.params.artist || '').toLowerCase();
  const matches = mockData.artists.filter((artist) =>
    artist.name.toLowerCase().includes(artistQuery)
  );

  const artists = matches.length > 0 ? matches : mockData.artists.slice(0, 5);
  return res.json({ artists: { items: artists } });
});

router.get('/get-artist/:artistId', function(req, res) {
  const artistId = req.params.artistId;
  const artist = mockData.artists.find((item) => item.id === artistId);

  if (!artist) {
    return res.status(404).json({ error: 'Artist not found' });
  }

  return res.json(artist);
});

router.get('/get-artist-info/:artistId', function(req, res) {
  const artistId = req.params.artistId;
  const artistInfo = mockData.artistDetails[artistId] || mockData.artistDetails.default;
  return res.json(artistInfo);
});

module.exports = router;
