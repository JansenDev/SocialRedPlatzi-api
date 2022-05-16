const { myQuery } = require("../../../store/mysql");

module.exports = (injectedStore) => {
  store = injectedStore;
  if (!store) {
    store = require("../../../store/mysql");
  }
  const TABLE = "POST";

  async function list() {
    const query = `SELECT * FROM post`;
    return store.myQuery(query);
  }

  async function listById(id) {
    return store.get_data(TABLE, id);
  }

  async function insert(data) {
    return store.insert(TABLE, data);
  }

  async function update(data) {
    return store.update(TABLE, data);
  }

  async function deleteById(id) {
    return store.deleteById(TABLE, id);
  }

  return {
    list,
    listById,
    insert,
    update,
    deleteById,
  };
};
