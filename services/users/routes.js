const express = require('express');
const router = express.Router();

const controllers = require('./controllers');

router.get('/users', async (req,res, next) => {
  try {
    res.status(200).json({message: 'success'});
  } catch (err) {
    next(err);
  }
})

module.exports = router;