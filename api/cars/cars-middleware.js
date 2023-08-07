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

// TODO: Implement validation and uniqueness checks for the vin number

module.exports = {
  checkCarId,
  checkCarPayload,
  // checkVinNumberValid,
  // checkVinNumberUnique,
};

