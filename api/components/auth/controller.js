const token = require("../../../utils/token");
const TABLA = "auth";
const bcrypt = require("bcrypt");

module.exports = (injectStore) => {
  let store = injectStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  async function upsert(data) {
    const authData = {
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      password_hashed = await bcrypt.hash(data.password, 10);
      authData.password = password_hashed;
    }

    return store.upsert(TABLA, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username });

    return bcrypt.compare(password, data.password).then((status) => {
      if (status) {
        return token.code({ ...data });
      } else {
        throw new Error("Informacion invalida");
      }
    });
  }

  async function insert(data) {
    const authData = {
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      password_hashed = await bcrypt.hash(data.password, 10);
      authData.password = password_hashed;
    }

    return store.insert(TABLA, authData);
  }
  // TODO: AGREGAR EL CAMBIO DE CONTRASEÑA
  async function update(data) {

  }

  return {
    upsert,
    login,
    insert
  };
};
