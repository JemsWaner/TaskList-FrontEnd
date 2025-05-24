import { db } from "../src/db/database";
import { tasklist } from "../src/db/schema";
import { asc, eq } from "drizzle-orm";

export const getTask = async (req, res) => {
  try {
    const tasks = await db.select().from(tasklist);
    res.json(tasks);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

export const getOneTask = async (req, res) => {
  try {
    const { ID } = req.body;
    const singleTask = await db
      .select()
      .from(tasklist)
      .where(eq(tasklist.id, ID));
    res.json(singleTask);
    res.end();
  } catch (error) {}
};

export const addTask = async (req, res) => {
  try {
    const { Title, Description } = await req.body;
    await db
      .insert(tasklist)
      .values({ title: Title, description: Description });
    console.log("Datos agregados!!!");
    res.end();
  } catch (error) {
    console.log(error);
  }
};

/**==================================UPDATE */
export const updateTask = async (req, res) => {
  try {
    const { ID, Title, Description } = req.body;
    await db
      .update(tasklist)
      .set({ title: Title, description: Description })
      .where(eq(tasklist.id, ID));
    console.log("item updated!!");
    res.end();
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  const { ID } = req.body;
  await db.delete(tasklist).where(eq(tasklist.id, ID));
  console.log("Item deleted!!");
  res.end();
};
