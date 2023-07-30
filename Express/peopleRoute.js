const express = require('express');
const router = express.Router();

let {people} = require('./data')

router.get('/', (req, res) => {
    res.status(200).json({success:true, data:people})
})

router.post('/', (req, res) => {
    //console.log(req.body)
    const {name} = req.body;
    console.log(name)

    if(!name){
        return res.status(400).json({success:false, msg: 'please provide valid name'})
    }
    res.status(201).json({success: true, data: [...people, name]})
})

router.put('/:id',(req, res) => {
    const {id} = req.params;
    const {newName} = req.body;
    console.log(`id : ${id} , name: ${newName}`)

    const person = people.find((person) => person.id === Number(id))

    if(!person){
        return res.status(404).json({success: false, msg: `No person found with id : ${id}`})
    }

    const udpatedPerson = people.map((person)=> {
        if(person.id === Number(id)){
            person.name = newName;
        }
        return person
    })

    res.status(200).json({success: true, data: udpatedPerson})

})

router.delete('/:id', (req, res) => {
    const pId = req.params.id;
    console.log(`pId ${pId}`)

    const getPerson = people.find((person) => {
        person.id === Number(pId)
    })

    if(!getPerson){
        return res.status(404).json({success: false, msg: `no person found with id ${pId}`})
    }

    const updatedPeople = people.filter((person) => person.id !== Number(pId))

    return res.status(200).json({success: true, data: updatedPeople})
})

module.exports = router