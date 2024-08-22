const bcrypt = require("bcrypt");
exports.cifrarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
exports.validarPassword = async (password, hash) => {
  const coincide = await bcrypt.compare(contraseñaIntroducida, hashAlmacenado);
  return coincide;
};
