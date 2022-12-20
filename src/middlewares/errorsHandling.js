const errorHandling = (err, req, res, next) => {
  //renvoyer en reponse un objet
  //success: false
  //status:
  //Message
  //stack (dev, prod) (variables d'environnnements)
  console.log(err);
  const status = err.status || 500;
  res.status(status).send({
    success: false,
    status: status,
    stack: process.env.NODE_ENV,
    message: err.message || 'Something went wrong',
  });
  next();
};

module.exports = errorHandling;
