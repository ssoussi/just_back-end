const modeModel = require("../Models/modeModel");
const multer = require("multer");
var fs = require("fs");

module.exports = {
    add: function (req, res) {
        const reqFiles = [];

        for (var i = 0; i < req.files.length; i++) {
            reqFiles.push(req.files[i].filename)
        }
        const product = new modeModel({
            reference: req.body.reference,
            color: req.body.color,
            price: req.body.price,
            name: req.body.name,
            description: req.body.description,
            image: reqFiles,
        }
        )
        product.save(function (err) {
            if (err) {
                res.json({ state: "no", msg: err })
            }
            else {
                res.json({ state: "yes", msg: "correct" })
            }
        })


    },

    list: function (req, res) {
        modeModel.find({}, function (err, listProduct) {
            if (err) {
                res.json({ state: "no", msg: "error" })
            }
            else {
                res.json(listProduct)
            }
        })
    },
    getByID: function (req, res) {
        modeModel.findById({ _id: req.params.id }, function (err, product) {
            if (err) {
                res.json({ state: "no", msg: "error" })
            }
            else {
                res.json(product)
            }
        })
    },
    deleteProduct: function (req, res) {
        modeModel.findByIdAndRemove({ _id: req.params.id }, function (err) {
            if (err) {
                res.json({ state: "no", msg: "error" })
            }
            else {
                res.json({ state: "yes", msg: "correct" })
            }
        })
    },
    UpdateProduct: function (req, res) {
        modeModel.updateOne({ _id: req.params.id }, { $set: req.body },
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
        var file = __dirname + '/uploads/images/' + req.file.originalname
        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(file, data, function (err) {
                if (err) {
                    var response = {
                        message: 'sorry',
                        filename: req.file.originalname
                    }
                } else {
                    modeModel.updateOne({
                        _id: req.params.id
                    }, {
                        image: req.file.originalname,
                    },
                        function (err, list) {
                            if (err) {
                                res.json({
                                    state: "no",
                                    msg: "error" + err
                                });
                            } else {
                                res.json({
                                    state: "OK",
                                    msg: "done ! image updated"
                                });
                            }
                        }
                    );
                }
            })
        })
    }
}