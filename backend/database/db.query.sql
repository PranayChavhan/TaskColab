
SELECT u.user_id, u.firstname, u.lastname, u.profile_image_url, u.username,u.email from users as u inner join project_members as m on u.user_id=m.user_id where m.project_id=18; 