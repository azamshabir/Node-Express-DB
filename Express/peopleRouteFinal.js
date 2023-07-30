const express = require('express');
const router = express.Router();

const {getPeople, createPeople, updatePeople, deletePeople} = require('./controller/people')

/*
router.get('/', getPeople)
router.post('/', createPeople)
router.put('/:id', updatePeople)
router.delete('/:id', deletePeople)
*/

router.route('/').get(getPeople).post(createPeople)
router.route('/:id').put(updatePeople).delete(updatePeople)

module.exports = router 