const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, 'secret123', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/ramadan/loginAdmin');
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
      res.redirect('/ramadan/loginAdmin');
    }
  };


  module.exports = requireAuth