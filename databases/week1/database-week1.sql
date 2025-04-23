-- Active: 1744491191603@@127.0.0.1@3306@hyf_lesson1

--1. Find out how many tasks are in the task table
SELECT COUNT(*) AS total_tasks
FROM task LIMIT 100;

--2. Find out how many tasks in the task table do not have a valid due date
select COUNT(*) AS total_task
FROM task
WHERE due_date IS NULL LIMIT 100

--3. Find all the tasks that are marked as done
select task.title, status.name
FROM task 
LEFT JOIN status
ON status_id = status.id
WHERE status_id = 3

--4. Find all the tasks that are not marked as done
select task.title, status.name
FROM task 
LEFT JOIN status
ON status_id = status.id
WHERE status_id != 3

--5. Get all the tasks, sorted with the most recently created first
SELECT task.title, task.created
FROM task
ORDER BY created DESC

--6. Get the single most recently created task
SELECT task.title, task.created
FROM task
ORDER BY created DESC LIMIT 1

--7. Get the title and due date of all tasks where the title or description contains database
SELECT task.title, task.due_date
FROM task
WHERE title LIKE '%database%' 
OR description LIKE '%database%'

--8. Get the title and status (as text) of all tasks
select task.title, status.name
FROM task LEFT JOIN status
ON status_id = status.id 

--9. Get the name of each status, along with a count of how many tasks have that status
SELECT status.name, COUNT(task.id) AS counted_task
FROM status
LEFT JOIN task
ON status.id = task.status_id
GROUP BY status.name

--10. Get the names of all statuses, sorted by the status with most tasks first
SELECT status.name, COUNT(task.id) AS total_task
FROM status
LEFT JOIN task
ON status.id = task.status_id
GROUP BY status.name
ORDER BY total_task DESC
