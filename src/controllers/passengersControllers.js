const travels = require("../models/travels.json")
const passengers = require("../models/passengers.json")
const utils = require("../utils/travelsUtils")

const fs = require("fs")

const getAllPassengers = (req, res) => {
    res.status(200).send(passengers)
}

const getPassengerById = (req, res) => {
    let requestedId = req.params.id 
    let filteredId = utils.findById(passengers, requestedId)

    res.status(200).send(filteredId)
}

const createPerson = (req,res) => {
    let {name, email, documentNumber} = req.body

   let newPerson = {
     id: Math.random().toString(32).substr(2),
     name,
     email,
     documentNumber
    }

   let travelRequiredId = req.params.id

   let travelRequired = utils.findById(travels,travelRequiredId)

   travels.forEach((travel) => {

       let sameTravel = travel === travelRequired

       if (sameTravel) {
           travel.passengersInfos.push(newPerson)
       }

   })

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels),"utf8", function(err){
        if(err) {
            res.status(500).send({
                "message": err
            })
        } else {

            res.status(201).send({
             "message": "Passageiro adicionado à viagem com sucesso!", travelRequired
            })
        }

    }) 

}

const deletePerson = (req,res) => {

    const requestedId = req.params.id

    const filteredPerson = utils.findById(passengers, requestedId)

    const index = passengers.indexOf(filteredPerson)

    if(index >= 0) {
        passengers.splice(index, 1)

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf-8', (err) => {
            if (err) {
                res.status(500).send({
                    "message": err
                })
            }else{
                res.status(200).send({
                    "message": "Passageiro excluído com sucesso", passengers
                })
            }
        })
    }
}

const replacePassenger = (req, res) => {
    let requestedId = req.params.id 

    let {name, email, documentNumber, travelId} = req.body 

    let filteredPerson = utils.findById(passengers, requestedId)

    const indice = passengers.indexOf(filteredPerson)

    const newName = {
        id: requestedId,
        name,
        email,
        documentNumber,
        travelId
    }

    if(indice >=0) {
        passengers.splice(indice, 1, newName)
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), "utf-8", (err) => {
            if(err) {
                res.status(500).send({"message": err})
            } else {
                res.status(200).send({"message": "Passageiro substituído no sistema com sucesso", newName})
            }
        })
    }
}

const updateName = (req, res) => {
    let requestedId = req.params.id 

    let newName = req.body.name

    let filteredId = utils.findById(passengers, requestedId)

    if(filteredId) {
        filteredId.name = newName

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), "utf-8", (err) => {
            if(err) {
                res.status(500).send({
                    "message": err,
                })
            } else{
                res.status(200).send({
                    "message": "Nome atualizado com sucesso!!", filteredId
                })
            }
        })
    } else {
        res.status(500).send({"message": "Passageiro não encontrado."})
    }
}

module.exports = {getAllPassengers, 
    createPerson, 
    getPassengerById, 
    deletePerson, 
    replacePassenger, 
    updateName
} 