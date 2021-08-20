//se añade el servidor express y se crea aplicacion
const { Router } = require("express");
let express = require("express");
const productosRepo = require("./repos/reposProductos");
let app = express();
let reposProductos = require("./repos/reposProductos");

//usamos el objetp express Router
let router = express.Router();

//se agrega middleware para JSON parsing in request de los objetos

app.use(express.json());

//creamos GET para retornar el listado de productos
router.get("/", function (req, res, next) {
  reposProductos.get(
    function (data) {
      res.status(200).json({
        status: 200,
        stausText: "ok",
        message: "Estos son Todos los Productos",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

//creamos un GET/search para buscar productos por id o por nombre
//  /search?id=numero&name=str

router.get("/search", function (req, res, next) {
  let searchObject = {
    id: req.query.id,
    name: req.query.name,
  };

  reposProductos.search(
    searchObject,
    function (data) {
      res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Resultado de busquedad ",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

//creamos router que utiliza id llamando a la funcion getById
router.get("/:id", function (req, res, next) {
  reposProductos.getByID(
    req.params.id,
    function (data) {
      if (data) {
        res.status(200).json({
          status: 200,
          statusText: "OK",
          message: "Ver Producto",
          data: data,
        });
      } else {
        res.status(404).send({
          status: 404,
          statusText: "Not Found",
          message:
            "El producto con id  '" + req.params.id + "' no se pudo encontrar",
          error: {
            code: "NOT_FOUND",
            message: "Producto con id '" + req.params.id + "' no existe.",
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

router.post("/", function (req, res, next) {
  productosRepo.insert(
    req.body,
    function (data) {
      res.status(201).json({
        status: "201",
        statusText: "creado",
        message: "Nuevo Producto Agregado",
        data: data,
      });
    },
    function (err) {
      next(err);
    }
  );
});

router.put("/:id", function (req, res, next) {
  reposProductos.getByID(
    req.params.id,
    function (data) {
      if (data) {
        //se intentara actualizar la data dado que se encontro el objeto
        productosRepo.update(req.body, req.params.id, function (data) {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: "Producto '" + req.params.id + "' ha sido actualizado",
            data: data,
          });
        });
      } else {
        res.status(404).send({
          status: 404,
          statusText: "No Encontrado",
          message:
            "El producto con id '" + req.params.id + "' no se ha encontrado",
          error: {
            code: "No_Encontrado",
            message:
              "El producto con id '" + req.params.id + "' no se ha encontrado",
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

router.delete("/:id", function (req, res, next) {
  reposProductos.getByID(
    req.params.id,
    function (data) {
      if (data) {
        reposProductos.delete(req.params.id, function (data) {
          res.status(200).json({
            status: 200,
            statusText: "OK",
            message: "El Producto '" + req.params.id + "'ha sido Eliminado",
            data: "El Producto '" + req.params.id + "'ha sido Eliminado",
          });
        });
      } else {
        res.status(404).send({
          status: 404,
          statusText: "No Encontrado",
          message:
            "El producto con id '" + req.params.id + "' no se ha encontrado",
          error: {
            code: "No_Encontrado",
            message:
              "El producto con id '" + req.params.id + "' no se ha encontrado",
          },
        });
      }
    },
    function (err) {
      next(err);
    }
  );
});

//configuramos router para que todos los router tengan el prefijo "/api"
app.use("/api", router);

//creamos el servidor para que escuche e en el puerto 5000
var server = app.listen(8080, () =>
  console.log("Server http://localhost:8080...")
);

//npm start
