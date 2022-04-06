const express = require("express");
const app = express();

require("dotenv").config();
const Phonebook = require("./models/Phonebook");

// findById sorgusunun :id parametresi ile hatasız sorgulama yapabilmesi için eklendi
const mongoose = require("mongoose");

// Log almak için
const morgan = require("morgan");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// body requestlerinin içerisinden json formatındaki verileri alabilmek için
app.use(express.json());

app.use(express.static('build'))

// from origin 'http://...' has been blocked by CORS policy hatasını gidermek için
const cors = require("cors");
app.use(cors());
// üst satırdaki kodun yeterli olması gerekirken aşağıdaki satırı eklemeden Cors sorunu giderilmedi!
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const errorHandler = (error, request, response, next) => {

  if (error.name === "CastError") {
    //console.log("errorHandler-CastErrorr:", error);
    return response.status(400).send({ message: "malformatted id" });
  }else if (error.name === 'ValidationError') {
    //console.log("errorHandler-ValidationErrorr:", error.message);
    return response.status(400).json({ message: error.message })
  }

  next(error);
};

generateId = () => {
  let i = Math.floor(Math.random() * 1000000);
  return i;
};

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>"); });

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((e) => {
    response.json(e);
  });
});

app.get("/api/persons/:id", (request, response) => {
  /// var id = new mongoose.Types.ObjectId(request.params.id);
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    Phonebook.findById(request.params.id)
      .then((e) => {
        if (e) {
          response.json(e);
        } else {
          response.status(404).end();
        }
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send({ error: "malformatted  id! " + err });
      });
  } else {
    response.status(400).send({ error: "malformatted  id!" });
  }
});

app.delete("/api/persons/:id", (request, response) => {
  /// var id = new mongoose.Types.ObjectId(request.params.id);
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    Phonebook.deleteOne({ _id: request.params.id })
      .then((e) => response.status(204).json("Record deleted"))
      .catch((err) => response.status(400).send({ error: "Get error:" + err }));
  } else {
    response.status(400).send({ error: "id is not valid!" });
  }
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;
  if (!body) {
    return response.status(400).json({
      error: "Content missing",
    });
  }
  if (!body.name) {
    return response.status(400).json({
      error: "Name required",
    });
  }

  let p = await Phonebook.find({ name: body.name });
  if (p.length > 0) {
    console.log("Exist:", p[0]);
    p[0].phone = boyd.number;
    p[0].save();
    console.log("saved");
    return response.status(400).json({ error: "Name must be unique" });
  }

  const newPhone = new Phonebook({
    name: body.name,
    number: body.number,
  });
  newPhone
    .save()
    .then((e) => {response.json(e)})
    .catch((error) => next(error));
});

app.put("/api/persons/:id", async (request, response, next) => {
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    let p = await Phonebook.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    }).catch((error) => next(error));
    response.json(p);
  }
});

app.get("/api/info", (request, response) => {
  let str = `Phonebook has info for -?- people`;
  str += "\n" + Date().toString();

  response.send(str);
});


// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
