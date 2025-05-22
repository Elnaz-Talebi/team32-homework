--Get all the tasks assigned to users whose email ends in @spotify.com
SELECT user.id, user.name, user.email, task.title
FROM user
    LEFT JOIN task on task.user_id = user.id
WHERE
    user.email LIKE '%@spotify.com'

--Get all the tasks for 'Donald Duck' with status 'Not started'
SELECT task.id, task.title, user.name, status.name
FROM
    task
    LEFT JOIN status ON task.status_id = status.id
    LEFT JOIN user_task ON user_task.task_id = task.id
    LEFT JOIN user ON user_task.user_id = user.id
WHERE
    status.name like '%Not started%'
    AND user.name LIKE '%Donald Duck%';

--Get all the tasks for 'Maryrose Meadows' that were created in september (hint: month(created)=month_number)
SELECT task.title, task.created, user.name
FROM task
    LEFT JOIN user_task ON user_task.task_id = task.id
    LEFT JOIN user ON user_task.user_id = user.id
WHERE
    user.name like '%Maryrose Meadows%'
    and MONTH(created) = 9;

--Find how many tasks where created in each month, e.g. how many tasks were created in october, how many tasks were created in november, etc. (hint: use group by)
SELECT MONTH(task.created) as month, COUNT(task.id) AS counted_task
FROM task
GROUP BY
    month;