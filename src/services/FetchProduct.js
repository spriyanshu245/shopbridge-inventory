import { firestore } from "../firebase";
const db = firestore.collection("/products");

const getAll = () => {
  return db;
};

const create = (data) => {
  return db.add(data);
};

const update = (id, value) => {
  return db.doc(id).update(value);
};

const remove = (id) => {
  return db.doc(id).delete();
};

const FetchProduct = {
  getAll,
  create,
  update,
  remove
};

export default FetchProduct;