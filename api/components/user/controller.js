const { nanoid } = require("nanoid");

const auth = require("../auth");
const TABLA = "user";
const erros = require("../../../utils/error-trhow");

module.exports = (injectedStore) => {
  store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }

  async function list() {
    return store.list(TABLA);
  }

  function get_data(id) {
    return store.get_data(TABLA, id);
  }
  // ^@deprecated:
  async function upsert(data) {
    const user = {
      name: data.name,
      username: data.username,
    };
    if (data.id) {
      user.id = data.id;
    } else {
      user.id = nanoid();
    }

    if (data.password || user.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }
    return store.upsert(TABLA, user);
  }

  async function insert(data) {
    // TODO: agregar si existe nombre de usuario

    const user = {
      name: data.name,
      username: data.username,
    };

    if (data.password || user.username) {
      await auth.insert({
        username: user.username,
        password: data.password,
      });
    }
    return store.insert(TABLA, user);
  }

  async function update(data) {
    console.log("UPDATED SUCCESS!");

    if (!data.id) {
      throw erros("id is required", 404);
    }
    const id_user = data.id;
    const user = await get_data(id_user);

    if (!user) {
      throw erros(`User Not exist: ${id_user}`, 404);
    }

    return store.update(TABLA, data);
  }

  async function follow(from, to) {
    return store.insert(TABLA + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  return {
    list,
    get_data,
    insert,
    update,
    follow,
  };
};
