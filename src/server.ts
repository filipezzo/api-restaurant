import express, { json } from "express";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes";

const PORT = 3333;
const app = express();

app.use(json());
app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`running at ${PORT}`));
