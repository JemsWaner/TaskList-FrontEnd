import { eq } from "drizzle-orm";
import { db } from "../src/db/database";
import { tasklist } from "../src/db/schema";
import type { Request, response, Response } from "express";

async function checkIfExists(id) {
  const [checkValue] = await db
    .select()
    .from(tasklist)
    .where(eq(tasklist.id, id));
  console.log(checkValue);
}

export const getTask = async (req, res) => {
  try {
    const tasks = await db.select().from(tasklist);
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isInteger(id) && id > 0) {
      checkIfExists(id);
      const singleTask = await db
        .select()
        .from(tasklist)
        .where(eq(tasklist.id, id));
      res.json(singleTask);
      res.end();
    } else {
      res.status(400).json({
        id: "The parametrer id inserted is not a number or was not found in the database",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postTask = async (req, res) => {
  try {
    const { title, description } = await req.body;
    const [task] = await db.insert(tasklist).values({ title, description });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
  }
};

/**==================================UPDATE */
export const updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (Number.isInteger(id) && id > 0) {
      const [task] = await db
        .update(tasklist)
        .set({ title, description })
        .where(eq(tasklist.id, id));
      res.status(200).json(task);
    } else {
      res.status(400).json({
        id: "The parametrer id inserted is not a number or was not found in the database",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
///////////////////*************Delete  */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    let id = Number(req.params.id);
    if (Number.isInteger(id) && id > 0) {
      await db.delete(tasklist).where(eq(tasklist.id, id));
      res.status(204).end();
    } else {
      res.status(400).json({
        id: "The parametrer id inserted is not a number or was not found in the database",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
