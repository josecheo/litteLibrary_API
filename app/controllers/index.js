const models = require("../models");


// Buscar
exports.getAll = (req, response) => {
  models.getAll(req.query, (err, data) => {
    if (err)
      response.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else response.send(data);
  });
};

// Crear
exports.addNewBook = (req, res) => {
  const {
    bookId,
    title,
    author,
    publication,
    edition,
    copies,
    imagenUrl
  } = req.body
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const book = {
    bookId,
    title,
    author,
    publication,
    edition,
    copies,
    imagenUrl
  };
  if (!bookId) {
    models.create(book, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  } else {
    models.update(book, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  }

};

// Delete
exports.delete = (req, res) => {
  models.remove(req.body.bookId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete Customer with id " + req.params.bookId
      });
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.login = (req, res) => {
  models.login(req.body, (err, data) => {
    console.log("data", data)
    if (err) {
      res.status(500).send({
        message: "Error en conexión"
      });
    }
    if (data.recordset) {
      if (data.recordset.length > 0) {
        res.send(data.recordset)
      }else {
        res.send({ codigo: '0' })
      }
    } 
  })};

  exports.createUser = (req, res) => {
    const {
      fullname,
      email,
      password,
    } = req.body
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const user = {
      fullname,
      email,
      password,
    };
      models.createUser(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
    
  
  };