const quotationController = require('../controllers/quotationController')
const upload = require('../middlwore/uploadPDF')

const router = require('express').Router()

router.post('/add', quotationController.add)
router.get('/list', quotationController.getAll)
router.get('/getByID/:id', quotationController.getByID)
router.delete('/delete/:id', quotationController.delete)
router.put('/update/:id', quotationController.Update)
router.put('/accepted-quotation/:id', quotationController.acceptedStatus)
router.put('/denied-quotation/:id', quotationController.DeniedStatus)
router.put('/push/:id', quotationController.pushDetails)
router.get("/getFile/:file", quotationController.getfile);
router.post('/pushFile1/:id', upload.single('file1'), quotationController.pushFile1)
router.post('/pushFile2/:id', upload.single('file2'), quotationController.pushFile2)
router.post('/pushFile3/:id', upload.single('file3'), quotationController.pushFile3)
router.post('/pushFile4/:id', upload.single('file4'), quotationController.pushFile4)

module.exports = router