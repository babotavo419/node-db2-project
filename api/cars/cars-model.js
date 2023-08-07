const db = require('../../data/db-config');

function getAll() {
  return db('cars');
}

function getById(id) {
  return db('cars').where({ id }).first();
}

function create(car) {
  return db('cars').insert(car)
    .then(([id]) => getById(id));
}

module.exports = {
  getAll,
  getById,
  create,
};

