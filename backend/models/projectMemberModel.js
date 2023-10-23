const db = require("../config/db");


module.exports = {
    addMember:(projectId,userId)=>{
        return new Promise((resolve,reject)=>{
            db.query('INSERT INTO project_members(project_id,user_id) VALUES ?, ?',[projectId,userId],
                (err,results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                }
            )
        })
    }


}