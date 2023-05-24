import express from 'express';
import {
    instructorCreate,
    instructorDelete,
    instructorDetail,
    instructorList,
    instructorModify,
    instructorReplace,
    instructorsDelete,
    instructorsModify
} from '@controllers/instructor.controller.js';

const router = express.Router();

// CREATE

router.post('/instructor', instructorCreate);

// READ

router.get('/instructor/:id', instructorDetail);

router.get('/instructors', instructorList);

// UPDATE

router.put('/instructor/:id', instructorReplace);

router.patch('/instructor/:id', instructorModify);

router.patch('/instructors', instructorsModify);

// DELETE

router.delete('/instructor/:id', instructorDelete);

router.delete('/instructors', instructorsDelete);

export default router;
