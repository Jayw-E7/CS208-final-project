var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM reviews;', (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).send('Error fetching reviews');
      }
      res.render('index', { title: 'Downtown Donuts', reviews: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* GET menu. */
router.get('/menu', function(req, res, next){
  try {
    req.db.query('SELECT * FROM reviews;', (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).send('Error fetching reviews');
      }
      res.render('menu', { title: 'Downtown Donuts', reviews: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* GET about page. */
router.get('/about', function(req, res, next){
  try {
    req.db.query('SELECT * FROM reviews;', (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).send('Error fetching reviews');
      }
      res.render('about', { title: 'Downtown Donuts', reviews: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* GET reviews page. */
router.get('/reviews', function(req, res, next){
  try {
    req.db.query('SELECT * FROM reviews;', (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).send('Error fetching reviews');
      }
      res.render('reviews', { title: 'Downtown Donuts', reviews: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.post('/create', function (req, res, next) {
    const { review } = req.body;
    try {
      req.db.query('INSERT INTO reviews (review) VALUES (?);', [review], (err, results) => {
        if (err) {
          console.error('Error adding Review:', err);
          return res.status(500).send('Error adding Review');
        }
        console.log('Review added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/reviews');
      });
    } catch (error) {
      console.error('Error adding Review:', error);
      res.status(500).send('Error adding Review');
    }
});

router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM reviews WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting Review:', err);
          return res.status(500).send('Error deleting Review');
        }
        console.log('Review deleted successfully:', results);
        // Redirect to the home page after deletion
        res.redirect('/reviews');
    });
    }catch (error) {
        console.error('Error deleting Review:', error);
        res.status(500).send('Error deleting Review:');
    }
});

module.exports = router;