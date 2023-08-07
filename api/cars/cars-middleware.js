const Cars = require('./cars-model');

async function checkCarId(req, res, next) {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkCarPayload(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({ message: `${!vin ? 'vin' : !make ? 'make' : !model ? 'model' : 'mileage'} is missing` });
  } else {
    next();
  }
}

async function checkVinNumberValid(req, res, next) {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) { 
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` })
  }
}

async function checkVinNumberUnique(req, res, next) {
  const { vin } = req.body;
  const car = await db('cars').where('vin', vin).first()
  if (car) {
    next({ status: 400, message: `vin ${vin} already exists` })
  } else {
    next();
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

