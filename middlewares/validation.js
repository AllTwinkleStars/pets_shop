const validation = (schema) => {
  return (req, res, next) => {
    // const obj = JSON.parse(JSON.stringify({ ...req.body, image: req.file }));
    // console.log(obj);
    const { error } = schema.validate(
      req.file ? { ...req.body, image: req.file } : req.body
    );
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
