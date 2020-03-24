const beautyModel = require("../Models/beautyModel");
const multer = require("multer");
var fs = require("fs");
const upload = multer({ dest: __dirname + "/uploads/images/" })
module.exports = {
    add: function (req, res) {
        var file = __dirname + "/uploads/images/" + req.file.originalname;
        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(file, data, function (error) {
                if (error) {
                    var response = {
                        message: "sorry could not upload file", filename: req.file.originalname
                    }
                }

                else {
                    const product = new beautyModel({
                        reference: req.body.reference,
                        color: req.body.color,
                        price: req.body.price,
                        name: req.body.name,
                        description: req.body.description,
                        image: req.file.originalname,
                    }
                    )
                    product.save(function (err) {
                        if (err) {
                            res.json({ state: "no", msg: "error" })
                        }
                        else {
                            res.json({ state: "yes", msg: "correct" })
                        }
                    })
                }
            })
        })

    },

    list: function (req, res) {
        beautyModel.find({}, function (err, listProduct) {
            if (err) {
                res.json({ state: "no", msg: "error" })
            }
            else {
                res.json(listProduct)
            }
        })
    },
    getByID: function (req, res) {
        beautyModel.findById({ _id: req.params.id }, function (err, product) {
            if (err) {
                res.json({ state: "no", msg: "error" })
            }
            else {
                res.json(product)
            }
        })
    },
    deleteProduct: function (req, res) {
        beautyModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
            if (err) {
                res.json({ state: "no", msg: "error" })
            }
            else {
                res.json({ state: "yes", msg: "correct" })
            }
        })
    },
    UpdateProduct: function (req, res) {
        beautyModel.updateOne({ _id: req.params.id }, { $set: req.body },
            {
                reference: req.body.reference,
                color: req.body.color,
                price: req.body.price,
                name: req.body.name,
                description: req.body.description,
            },
            function (err) {
                if (err) {
                    res.json({ state: "no", msg: "error" })
                }
                else {
                    res.json({ state: "yes", msg: "correct" })
                }
            }
        )
    },
    getFile: function (req, res) {
        res.sendFile(__dirname + "/uploads/images/" + req.params.avatar)
    },
    Upload: function (req, res) {
        var file = __dirname + '/uploads/' + req.file.originalname
        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(file, data, function (err) {
                if (err) {
                    var response =
                    {
                        message: 'sorry',
                        filename: req.file.originalname
                    }
                } else {
                    res.json({ state: "ok" })
                }
            })
        })
    }
}