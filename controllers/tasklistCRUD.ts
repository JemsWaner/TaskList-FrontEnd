import { eq } from "drizzle-orm";
import { db } from "../src/db/database";
import { tasklist } from "../src/db/schema";
import type { Request, Response } from "express";

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
    const { id } = req.params;
    const singleTask = await db
      .select()
      .from(tasklist)
      .where(eq(tasklist.id, id));
    res.json(singleTask);
    res.end();
  } catch (error) {}
};

export const addTask = async (req, res) => {
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
    const { id } = req.params;
    const { title, description } = req.body;
    const [task] = await db
      .update(tasklist)
      .set({ title, description })
      .where(eq(tasklist.id, id));
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(tasklist).where(eq(tasklist.id, Number(id)));
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
};
