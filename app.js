import express from "express";
import routerApi from "./routes/index.js";
import cors from "cors";
import {
  logsError,
  errorHandler,
  boomErrorHandler,
} from "./midlewares/error.handles.js";

const app = express();
const PORT = 8080;

app.use(express.json());

const whitelist = [
  "http://127.0.0.1:5500/index.html",
  "http://localhost:8080/api/v1/products",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes()) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors());
routerApi(app);

app.use(logsError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hola mundo nuevamente");
});

app.listen(PORT, () => {
  console.log("Server up..");
});
