const db = {
  user: [{ id: "1", name: "Carlos" }],
};

list = async (tabla) => {
  return db[tabla] || [];
};

get_data = async (tabla, id) => {
  let col = await list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
};

upsert = async (tabla, data) => {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  db[tabla].push(data);
  return data;
};

remove = (tabla, id) => {
  return true;
};

query = async (tabla, consulta) => {
  let col = await list(tabla);
  let keys = Object.keys(consulta);
  let key = keys[0];

  return col.filter((item) => item[key] === consulta[key])[0] || null;
};

module.exports = {
  list,
  get_data,
  upsert,
  remove,
  query,
};
