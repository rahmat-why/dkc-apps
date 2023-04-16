import { Router } from 'express'
import * as schoolController from "./../controllers/schoolController.js"
import * as gpReportDkrController from "./../controllers/gpReportDkrController.js"

import multer from 'multer';
import path from 'path'
import fs from 'fs';

// general (without file)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// document (file)
const storageUpload = (directory) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            fs.mkdirSync("./upload/"+directory, { recursive: true });
            cb(null, "./upload/"+directory);
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, Date.now()+extension)
        }
    })
}
const uploadFile = (directory) => {
    return multer({ 
        storage: storageUpload(directory),
        fileFilter: (req, file, cb) => {
            const filetypes = /jpeg|jpg|png|gif/;
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
        
            if (extname && mimetype) {
                return cb(null, true);
            } else {
                cb('Error: Extension invalid!');
            }
        } 
    });
} 

const router = Router()

// school
router.get('/api/schools', schoolController.getAll)

router.post('/api/schools', upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), schoolController.store)

router.put('/api/schools/:school_id', upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), schoolController.update)

router.delete('/api/schools/:school_id', schoolController.destroy)

// gp report dkr
router.get('/api/gp-reports', gpReportDkrController.getAll)
router.post('/api/gp-reports', uploadFile("gp-report").single('document'), gpReportDkrController.store)
router.delete('/api/gp-reports/:report_id', gpReportDkrController.destroy)

export default router