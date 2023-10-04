import express, { json } from "express";
import morgan from "morgan";
import routes from "./routes/routes";

const app = express();
app.use(json());
app.use(morgan("combined"));

app.use("/", routes);

const host: string = "0.0.0.0";
const port: number = 8080;
app.listen(port, host, () => console.log(`listening on ${host}:${port}`));
