import express, { Request, Response, NextFunction } from "express";
import { query, body } from "express-validator";
import * as moviesController from "../controllers/moviesCollection";
import * as commentsController from "../controllers/comments";
import { InternalServer } from "../errors/internal-server";
import { validateRequests } from "../errors/validate-requests";
import { ResponsesCode } from "../constants/responses";

const router = express.Router();

/* comment validator */
const commentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await query("movie").notEmpty().isNumeric().run(req);
  validateRequests(req, next);
};

/* submit comment validator */
const submitCommentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("movieId").notEmpty().isNumeric().run(req);
  await body("commentBody").notEmpty().isString().run(req);
  await body("userName").notEmpty().isString().run(req);
  validateRequests(req, next);
};

/* GET all comments of a movie */
router.get("/comments", commentValidator, function (req, res, next) {
  const movieId = req.query["movie"]?.toString();
  commentsController
    .getMovieComments(parseInt(movieId || "0"))
    .then((comments) => res.send(comments))
    .catch(() => new InternalServer());
});

/* POST submit comment */
router.post(
  "/comment",
  submitCommentValidator,
  (req: Request, res: Response, next: NextFunction) => {
    commentsController
      .addComment(req.body.movieId, req.body.commentBody, req.body.userName)
      .then((_) => res.sendStatus(ResponsesCode.NO_CONTENT))
      .catch((_) => next(new InternalServer()));
  }
);

/* GET movies list */
router.get("/movies", function (req, res, next) {
  moviesController
    .getAll()
    .then((movies) => res.send(movies))
    .catch(() => new InternalServer());
});

/* GET a movie by name */
router.get("/search", function (req, res, next) {
  const movieName = req.query["name"]?.toString();
  moviesController
    .get(movieName || "")
    .then((movies) => res.send(movies))
    .catch(() => new InternalServer());
});

export default router;
