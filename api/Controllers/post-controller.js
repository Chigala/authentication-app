exports.get_post = function (req, res) {
    res.send({
        user: req.user,
        message: "you just reached the finish line with your jwt token"
    })
  };