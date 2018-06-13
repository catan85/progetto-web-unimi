

app.get('/login',
function(req, res){
  res.render('login');
});

// METODO PER L'AUTENTICAZIONE:
// autenticazione "tipo local" (tramite user / pass), 
// le alternative sarebbero tramite altre modalità come facebook, google ecc.
// se fallisce va alla pagina login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });