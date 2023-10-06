import { Router } from "express";
import { createClient } from "redis";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";
import { ProblemSchema } from "../model/Problem";
import solve from "../solver/solve";

const routes = Router();

const client = createClient({
  url: "redis://redis:6379",
});

routes.post("/", async (req, res) => {
  const problem = ProblemSchema.safeParse(req.body);
  if (!problem.success) {
    const errorMessage = problem.error.issues
      .map((issue) => issue.message)
      .join("\n");
    res.status(StatusCodes.BAD_REQUEST).send(errorMessage);
    return;
  }
  try {
    await client.connect();
    const solution = solve(problem.data);
    const key = v4().replaceAll("-", "");
    await client.set(key, JSON.stringify(solution), { EX: 120 });
    res.send(key);
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(JSON.stringify(e));
  } finally {
    client.disconnect();
  }
});

routes.get("/:key", async (req, res) => {
  const { key } = req.params;
  try {
    await client.connect();
    const solution = await client.get(key.toString());
    if (!solution) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }
    res.json(JSON.parse(solution));
  } catch (e) {
    console.error(e);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    client.disconnect();
  }
});
export default routes;
