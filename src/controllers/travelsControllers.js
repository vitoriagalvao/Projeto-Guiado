const travels = require("../models/travels.json");
const utils = require("../utils/travelsUtils");
const passengers = require("../src/models/passengers.json");
const fs = require("fs")

const getAllTravels = (req, res) => {
    const travelFilter = travels.filter(vaga => vaga.busInfos.capacity > 0)
    const availablePlace = travelFilter.sort(function(a,b){
        return (a.busInfos.capacity > b.busInfos.capacity) ? 1 : ((b.busInfos.capacity > a.busInfos.capacity) ? -1 : 0)
    })
    res.status(200).send(availablePlace)

};

const getTravelById = (req,res) => {

    let requestedId = req.params.id 

    let filteredTravel = utils.findById(travels, requestedId)

    res.status(200).send(filteredTravel)

}

const driverEdit = (req, res) => {
    let idDriver = req.params.id;
    let updatedDriver = req.body;

    let driverFound = travels.find(travels => travels.driverInfos.id == idDriver)
    let driverIndex = travels.indexOf(driverFound)
    driverFound.driverInfos = updatedDriver 
    if(driverIndex >=0 ) {
        travels.splice(driverIndex, 1, driverFound) //remove 1 elemento, a partir do index de driverIndex, e coloca o driver found no lugar

        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ "message": err})
            }
            else{
                const driverUpdated = travels.find(travels => travels.driverInfos.id == idDriver)
                res.status(200).send({ 
                    "message": "Motorista atualizado com sucesso."},
                    driverUpdated
                )
            }
        })
    } else {
        res.status(404).send ({ "message": "Motorista não encontrado para ser atualizado."})
    }
}


const replaceDriver = (req, res) => { 
    let idDriver = req.params.id;
    let updatedDriver = req.body;

    let driverFound = travels.find(travels => travels.driverInfos.id == idDriver)
    let driverIndex = travels.indexOf(driverFound)
    driverFound.driverInfos = updatedDriver 
    if(driverIndex >=0 ) {
        travels.splice(driverIndex, 1, driverFound) //remove 1 elemento, a partir do index de driverIndex, e coloca o driver found no lugar

        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function (err) {
            if (err) {
                res.status(500).send({ "message": err})
            }
            else{
                const driverUpdated = travels.find(travels => travels.driverInfos.id == idDriver)
                res.status(200).send({ 
                    "message": "Motorista atualizado com sucesso."},
                    driverUpdated
                )
            }
        })
    } else {
        res.status(404).send ({ "message": "Motorista não encontrado para ser atualizado."})
    }
}
   /*  let requestIdDriver = req.params.id 
    const  {name, license} = req.body
    let filteredDriver = utils.findById(travels, requestIdDriver)
    const indice = travels.indexOf(filteredDriver)
    let updateDriver = {
        id: requestIdDriver,
        name,
        license
    }
    if(indice >=0) {
        travels.splice(indice, 1, updateDriver)
        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), "utf-8", (err) => {
            if(err) {
                res.status(500).send({
                    "message": err
                })
            } else {
                res.status(200).send({
                    "message": "Motorista alterado com sucesso!", updateDriver
                })
            }
        })
    }
}
 */
const deleteTravel = (req,res) => {
    const requestedId = req.params.id 

    const filteredId = utils.findById(travels, requestedId)

    const indice = travels.indexOf(filteredId)

    if(indice >=0) {
        travels.splice(indice, 1)
        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), "utf-8", (err) => {
            if(err) {
                res.status(500).send({
                    "message": err
                })
            } else{
                res.status(200).send({
                    "message": "Viagem excluída com sucesso!"
                })
            }
        })
    }
}









    module.exports = {
        getAllTravels, 
        getTravelById, 
        driverEdit, 
        replaceDriver, 
        deleteTravel
    }