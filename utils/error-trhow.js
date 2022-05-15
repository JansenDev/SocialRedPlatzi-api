function errors(err, code) {
  const e = new Error(err);

  if (code) e.statusCode = code;

  return e;
}

module.exports = errors;