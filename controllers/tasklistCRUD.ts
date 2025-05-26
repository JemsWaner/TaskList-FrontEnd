import { eq } from "drizzle-orm";
import { db } from "../src/db/database";
import { tasklist } from "../src/db/schema";
import type { Request, response, Response } from "express";

async function taskExists(id: number) {
  const [checkValue] = await db
    .select()
    .from(tasklist)
    .where(eq(tasklist.id, id));
  return checkValue;
}

function isValidId(id: number) {
  let parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0;
}

async function findTask(id: number) {
  return await db.select().from(tasklist).where(eq(tasklist.id, id));
}

///////////////*******CRUD OF MY TASKS++++++++++ */
export const getTask = async (req: Request, res: Response) => {
  try {
    const tasks = await db.select().from(tasklist);
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!isValidId(id)) {
      res.status(400).json({
        error: "The given id is not valid",
      });
    }
    let taskExist = await taskExists(id);
    if (!taskExist) {
      res
        .status(404)
        .json({ error: "The task you're looking for doesn't exist" });
    }
    const singleTask = await findTask(id);
    res.json(singleTask);
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = await req.body;

    if (
      typeof title === "string" &&
      title.length > 0 &&
      title.trim() &&
      typeof description === "string" &&
      description.length > 0 &&
      description.trim()
    ) {
      let cleanTitle = title.trim();
      let cleanDescription = description.trim();
      const [result] = await db
        .insert(tasklist)
        .values({ title: cleanTitle, description: cleanDescription });
      const singleTask = await findTask(result.insertId);

      res.status(201).json(singleTask);
    } else {
      res.status(400).json({
        error: "The given titles and descriptions of your task are not valid",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**==================================UPDATE */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (!isValidId(id)) {
      res.status(400).json({
        id: "The given Id is not valid",
      });
    }
    let returnedTask = await taskExists(id);

    if (returnedTask && title.trim() && description.trim()) {
      let cleanTitle = title.trim();
      let cleanDescription = description.trim();
      const [task] = await db
        .update(tasklist)
        .set({ title: cleanTitle, description: cleanDescription })
        .where(eq(tasklist.id, id));
      let [taskfound] = await findTask(id);
      console.log({ task, taskfound });
      res.status(200).json(taskfound);
    } else {
      res.status(404).json({ error: "Nothing was found" });
    }
  } catch (error) {
    console.log(error);
  }
};

///////////////////*************Delete  */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    let id = Number(req.params.id);
    let confirmTaskExists = await taskExists(id);

    if (Number.isInteger(id) && id > 0 && confirmTaskExists) {
      await db.delete(tasklist).where(eq(tasklist.id, id));
      res.status(204).json({ success: "Task deleted successfully" }).end();
    } else {
      res.status(400).json({
        id: "The parametrer id inserted is not a number or was not found in the database",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
