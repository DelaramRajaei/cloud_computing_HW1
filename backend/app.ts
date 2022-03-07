import express, { NextFunction, Response, Request } from "express";
import http from "http";
import cors from "cors";

import { initial } from "./database/mongodb";
import { CustomError } from "./errors/custom-error";
import { ResponsesCode } from "./constants/responses";
import { default as rootRouter } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new Error("Not found"));
});

// error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.code).send({ message: err.message });
  } else {
    res
      .status(ResponsesCode.SERVER_ERROR)
      .send(err.message || "Oops! something went wrong");
  }
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || "3001";
app.set("port", port);

initial().then(() => {
  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log("The server is listening on port " + port);
  });
}).catch(()=>{
  console.log('Server is not starting')
});

export default app;
