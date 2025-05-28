CREATE TABLE `task_list` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` varchar(1000) NOT NULL,
	CONSTRAINT `task_list_id` PRIMARY KEY(`id`)
);
