let fs = require("fs");
const FILE_NAME = "./assets/productos.json";

let productosRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getByID: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let producto = JSON.parse(data).find((p) => p.id == id);
        resolve(producto);
      }
    });
  },
  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let productos = JSON.parse(data);
        //realixzar una busquedad
        if (searchObject) {
          productos =
            productos.filter((p) =>
              searchObject.id ? p.id == searchObject.id : true
            ) &&
            (searchObject.name
              ? p.name.toLowerCase().indexOf(searchObject.name) >= 0
              : true);
        }
        resolve(productos);
      }
    });
  },

  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let productos = JSON.parse(data);
        productos.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(productos), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: function (newData, id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let productos = JSON.parse(data);
        let producto = productos.find((p) => p.id == id);
        if (productos) {
          Object.assign(producto, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(productos), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let productos = JSON.parse(data);
        let producto = productos.findIndex((p) => p.id == id);
        if (producto != -1) {
          productos.splice(producto, 1);
          fs.writeFile(FILE_NAME, JSON.stringify(productos), function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(index);
            }
          });
        }
      }
    });
  },
};

module.exports = productosRepo;
