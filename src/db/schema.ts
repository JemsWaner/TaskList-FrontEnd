import { primaryKey } from "drizzle-orm/gel-core";
import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const tasklist = mysqlTable("task_list", {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 200 }).notNull(),
  description: varchar({ length: 1000 }).notNull(),
});
