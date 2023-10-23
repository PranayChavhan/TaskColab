const projectModel = require("../models/projectModel");


class ProjectController {
  //[GET] Get Project Created by user
  async getUserProject(req, res) {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ "msg": "Please Login, to get projects!" })
    }
    try {
      const projects = await projectModel.getProjectsByUser(userId)
      console.log("PRojects Fetched!")
      console.log(projects);
      return res.status(200).json({ "msg": "Projects Fetched!", "projects": projects });
    } catch (err) {
      console.log(err)
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }

  //[GET] Get Project Details From Id
  async getPorjectDetails(req, res) {
    const projectId = req.body.project_id;

    if (!projectId) {
      return res.status(400).json({ "msg": "Project Id cannot be empty!" });
    }
    try {
      const project = await projectModel.getProjectById(projectId);
      return res.status(200).json({ "msg": "Prjoject Found!", "project": project })
    } catch (err) {
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }

  // [POST] Create project
  async createProject(req, res) {
    const { name, description } = req.body;
    const userId = req.user.userId;

    if (!name || !description || !userId) {
      return res.status(400).json({ "msg": "Please provide all the fields!" })
    }
    console.log("UserID");
    console.log(userId);
    //Now if erverything is find create new Project
    const projectData = {
      name, description, userId
    }
    try {
      await projectModel.addProject(projectData);
      return res.status(200).json({ msg: "Project Created Successfull!" });
    } catch (err) {
      return res.status(400).json({ "msg": "This is a message!!" });
    }
  }

  //[PUT] Update Project
  async updateProject(req,res){
    const{project_id, name, description} = req.body;

    if(project_id||!name|| !description){
      return res.status(400).json({"msg":"Required fields cannot be empty!!"})
    }
    //Update the project

    try{
      const projectData = {
        project_id,
        name,
        description
      } 
      await projectModel.updateProjectById(projectData);
      return res.status(201).json({"msg":"Project Data Updated!!"});
    }catch(err){
      return res.status(400).json({"msg":"Something went wrong!!"});
    }
  }
}

module.exports = new ProjectController();