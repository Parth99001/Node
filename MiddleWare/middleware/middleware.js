 const isAuthenticated = (req, res, next)=> {
  let name = req.body.name;
  let password = req.body.password;
  console.log(req.body.password);
  let isAuth = name === "admin" && password === "admin" ? true : false;

  if (isAuth) {
    next();
    res.render("Home");
  } else {
    res.redirect("/");
  }
}

module.exports = isAuthenticated;
