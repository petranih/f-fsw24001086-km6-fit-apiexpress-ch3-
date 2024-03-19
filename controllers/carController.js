const fs = require("fs");
const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../data/cars.json`)
    );
const getCarsData = (req, res, next)=>{
    res.status(200).json({
        status: "succes",
        totaldata: cars.length,
        requestAt: req.requesTime,
        data: {
            cars,
        },
    });
};

const getCarDataById = (req, res, next)=>{
    const id = req.params.id
    // menggunakan array method utk membantu menemukan spesifik data
    const car = cars.find((car) => car.id === id);
    res.status(200).json({
        status: "success",
        data: {
            car,
        },
    });
};
const createcar = (req, res)=>{    
    const newCar = req.body;
    cars.push(newCar);
    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                car: newCar,
            },
        });
    });
};

const updateCar = (req,res) =>{
    const id = req.params.id
    const car = cars.find((car) => car.id === id)
    const carIndex = cars.findIndex((car) => car.id === id)
    if(!car){
        return res.status(404).JSON({
            status: "fail",
            message: `car dengan ID : ${id} gak ada`
        });
    }
    cars[carIndex] = {...cars[carIndex], ...req.body}
    // 4. melakukan update di dokumennya
    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: "succes",
            message: "berhasil",
            data:{
                car: car[carIndex],
                car,
            }
        });
    });
}
const deleteCar = (req,res) =>{
    const id = req.params.id
    const car = cars.find((car) => car.id === id)
    const carIndex = cars.findIndex((car) => car.id === id)
    if(!car){
        return res.status(404).JSON({
            status: "fail",
            message: `car dengan ID : ${id} gak ada`
        });
    }
    cars.splice(carIndex, 1);
    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: "succes",
            message: "data delete"
        });
    });
}

module.exports = {
    getCarsData,
    getCarDataById,
    updateCar,
    deleteCar,
    createcar
}