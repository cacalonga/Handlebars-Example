var express = require('express');
var router = express.Router();

var moongose = require("mongoose");
var User = moongose.model("User");



/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    res.render('list', { userList: users });
  });
});

router.get("/create", function (req, res, next) {
  res.render("create", { action: "/users/create", method: "post", title: "Yeni Kişi Kaydetme İşlemi", condition: false });
})

router.post("/create", function (req, res, next) {
  console.log(req);
  new User({
    ad: req.body.ad,
    soyad: req.body.soyad,
    dogumTarihi: req.body.dogumTarihi,
    email: req.body.email
  }).save(function (err, comment) {
    res.redirect("/users");
  });
})

router.get("/delete/:id", function (req, res, next) {
  console.log(req.params.id);
  User.findByIdAndRemove(req.params.id, function (err, result) {
    res.redirect("/users");
  })
})

router.get("/update/:id", function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    console.log(req.params.id)
    res.render("create", { user: user, action: "/users/update/:id", method: "post", title: "Kişiyi Güncelleme işlemi", condition: true });
  })
})

router.post("/update/:id", function (req, res, next) {
  //res.send("girdi")
  console.log(req.body);
   User.findOneAndUpdate({ "_id": req.body.id },
    {
      $set: {
        "ad": req.body.ad,
        "soyad": req.body.soyad,
        "dogumTarihi": req.body.dogumTarihi,
        "email": req.body.email
      }
    },function(err,result){
      if(err){
        console.log(err);
        res.send(err);
      }
      else{
        res.redirect("/users");
      }
    })
/*     .then(doc => {
        if (!doc) {
          return status(200).json(doc);
        }
      })
      .catch(err => next(err));   */
      //res.redirect("/users");
})


module.exports = router;
