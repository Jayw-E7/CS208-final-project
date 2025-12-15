var express = require('express');
var router = express.Router();

/* GET landing page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM reviews;', (err, results) => {
      if (err) {
        console.error('Error fetching landing page', err);
        return res.status(500).send('Error fetching landing page');
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
        console.error('Error fetching menu page', err);
        return res.status(500).send('Error fetching menu page');
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
        console.error('Error fetching about page', err);
        return res.status(500).send('Error fetching about page');
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
        console.error('Error fetching reviews page', err);
        return res.status(500).send('Error fetching reviews');
      }
      res.render('reviews', { title: 'Downtown Donuts', reviews: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* Add new review */
router.post('/create', function (req, res, next) {
    const { review, review_body } = req.body;
    const date = new Date().toLocaleString('en-US', {
        timeZone: 'America/Boise'
    });
    try {
      req.db.query('INSERT INTO reviews (review, review_body, date) VALUES (?, ?, ?);', [review, review_body, date], (err, results) => {
        if (err) {
          console.error('Error adding Review:', err);
          return res.status(500).send('Error adding Review');
        }
        console.log('Review added successfully:', results);
        // Redirect to the reviews page after adding
        res.redirect('/reviews');
      });
    } catch (error) {
      console.error('Error adding Review:', error);
      res.status(500).send('Error adding Review');
    }
});

/* Delete review */
router.post('/delete', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('DELETE FROM reviews WHERE id = ?;', [id], (err, results) => {
        if (err) {
          console.error('Error deleting Review:', err);
          return res.status(500).send('Error deleting Review');
        }
        console.log('Review deleted successfully:', results);
        // Redirect to the reviews after deletion
        res.redirect('/reviews');
    });
    }catch (error) {
        console.error('Error deleting Review:', error);
        res.status(500).send('Error deleting Review:');
    }
});

/* Change the review to edit mode */
router.post('/edit', function (req, res, next) {
    const { id } = req.body;
    try {
      req.db.query('SELECT * FROM reviews;', (err, results) => {
        if (err) {
            console.error('Error editing Review:', err);
            return res.status(500).send('Error editing Review');
        }
        res.render('reviews', {
            reviews: results,
            editId: id
        });
        console.log('Review changed to edit mode successfully:', results);
    });
    }catch (error) {
        console.error('Error editing Review:', error);
        res.status(500).send('Error editing Review:');
    }
});

/* Update review after editing */
router.post('/update', function (req, res, next) {
    const {id, review, review_body} = req.body;
    try {
        req.db.query('UPDATE reviews SET review = ?, review_body = ? WHERE id = ?', [review, review_body, id], (err, results) => {
            if (err) {
                console.error('Error updating Review:', err);
                return res.status(500).send('Error editing Review');
            }
            console.log('Review updated successfully:', results);
            res.redirect('/reviews');
        });
    } catch (error) {

    }
});

module.exports = router;