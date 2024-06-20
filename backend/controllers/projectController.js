const projectMemberModel = require("../models/projectMemberModel");
const projectModel = require("../models/projectModel");
const { head } = require("../routes");


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
      console.log("# ERROR: ", err)
      console.log(err)
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }

  //[GET] Get Project Details From Id
  async getPorjectDetails(req, res) {
    const projectId = req.query.id;
    const headId = req.user.userId;

    console.log("ProjectId:", projectId);
    if (!projectId) {
      return res.status(400).json({ "msg": "Project Id cannot be empty!" });
    }
    try {

      const queryResult = await projectModel.getProjectDetails(projectId, headId);

      const projectMembers = await projectModel.getProjectMembers(projectId);

      const projectTasks = await projectModel.getProjectTasks(projectId);

      console.log("Project Query")
      console.log(queryResult)

      const project = {
        id: queryResult[0].project_id, // Assuming the first record contains project details
        name: queryResult[0].name,
        description: queryResult[0].description,
        image: queryResult[0].image,
        project_head: queryResult[0].project_head,
        members: projectMembers,
        tasks: projectTasks
      };


      console.log(project);
      return res.status(200).json({ "msg": "Prjoject Found!", "project": project })
    } catch (err) {
      console.log("# ERROR: ", err)
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }

  // [POST] Create project
  async createProject(req, res) {
    const { name, description } = req.body;
    const userId = req.user.userId;

    if (!req.file) {
      console.log("Project FIle not present!!");
    }
    if (!name || !description || !userId) {
      return res.status(400).json({ "msg": "Please provide all the fields!" })
    }

    try {

      if (req.file) {

        //Saving the Image
        const imageFile = req.file;
        console.log("IMAGE: ", imageFile)
        const image = imageFile.filename;
        //Now if erverything is find create new Project

        const projectData = {
          name, description, userId, image
        }

        console.log("Projects Data", projectData)
        await projectModel.addProject(projectData);


        return res.status(200).json({ msg: "Project Created Successfull!" });
      } else {
        const image = null;
        const projectData = {
          name, description, userId, image: image
        }
        const results = await projectModel.addProject(projectData);
        console.log(results)
        console.log(results.insertId);
        const response = await projectMemberModel.addMember(projectId, userId);

        return res.status(200).json({ msg: "Project Created Successfull!" });
      }
    } catch (err) {
      console.log("# ERROR: ", err)
      console.log("Error Ocucured:", err)
      return res.status(500).json({ "msg": "This is a message!!" });
    }
  }

  //[PUT] Update Project
  async updateProject(req, res) {
    const { project_id, name, description } = req.body;

    if (project_id || !name || !description) {
      return res.status(400).json({ "msg": "Required fields cannot be empty!!" })
    }
    //Update the project
    try {
      const projectData = {
        project_id,
        name,
        description
      }
      await projectModel.updateProjectById(projectData);
      return res.status(201).json({ "msg": "Project Data Updated!!" });
    } catch (err) {
      console.log("# ERROR: ", err)
      return res.status(400).json({ "msg": "Something went wrong!!" });
    }
  }


  //[POST]: Add Member to the project
  async addMember(req, res) {
    const { userId, projectId } = req.body;
    const headId = req.user.userId;

    console.log(userId, "-", projectId)

    if (!projectId || !userId) {
      return res.status(400).json({ msg: "Please fill al the fields!" })
    }

    //Add Member
    try {
      //Verify if he is the project head or not
      const userProject = await projectModel.getProjectById(projectId);

      console.log(userProject)

      if (!userProject) {
        return res.status(400).json({ msg: "Porject does not exists!" });
      }

      if (userProject[0].project_head !== headId) {
        console.log(userProject[0].project_head)
        console.log(headId)
        return res.status(400).json({ msg: "You are not authorized to create or add members!" })
      }
      //Add Member
      const response = await projectMemberModel.addMember(projectId, userId);
      return res.status(200).json({ msg: "Member Added To Project!" });
    } catch (err) {
      console.log("# ERROR: ", err)
      console.log("ERROR: ", err);
      return res.status(500).json({ msg: "Something went wrong!!" })
    }
  }

  //[GET]: Get project members
  async getMember(req, res) {
    const { userId, projectId } = req.body;
    const headId = req.user.userId;

    console.log(userId, "-", projectId)

    if (!projectId || !userId) {
      return res.status(400).json({ msg: "Please fill al the fields!" })
    }

    //Add Member
    try {
      //Verify if he is the project head or not
      const userProject = await projectModel.getProjectById(projectId);

      console.log(userProject)

      if (!userProject) {
        return res.status(400).json({ msg: "Porject does not exists!" });
      }

      if (userProject[0].project_head !== headId) {
        console.log(userProject[0].project_head)
        console.log(headId)
        return res.status(400).json({ msg: "You are not authorized to create or add members!" })
      }
      //Add Member
      const members = await projectMemberModel.getMembers(projectId);

      console.log(members)
      return res.status(200).json({ msg: "Member Added To Project!", members: members });
    } catch (err) {
      console.log("# ERROR: ", err)
      console.log("ERROR: ", err);
      return res.status(500).json({ msg: "Something went wrong!!" })
    }
  }
}

module.exports = new ProjectController();


