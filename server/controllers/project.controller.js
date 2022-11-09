import * as permissionCheck from "../util/permissionCheck.js";
import Project from "../models/project.model.js";
import ProjectAssignee from "../models/projectAssignee.model.js";
import { getUserRole } from "../util/utils.js";
import mongoose from "mongoose";

/**
 * @description: Creates a project
 * @param {title} string 
 * @param {description} string optional
 *  
 * @returns status 200
 */

export const addProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageProject(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to add projects" });
        }

        //Verify if duplicate project exist with same project title
        const existingProject = await Project.findOne({ title });

        if (existingProject) {
            return res.status(400).json({ error: "Project already exist with that title" });
        }

        //Create project
        const project = await Project.create({ title, description, authorId: userId });

        //Assign author to the project using ProjectAssignee object
        await ProjectAssignee.create({ projectId: project._id, userId });

        return res.sendStatus(200);

    } catch (error) {
        return res.staus(500).json({ error: error.message });
    };
};


/**
 * @returns Signed in user's project
 */
export const getUserProjects = async (req, res) => {
    try {
        const userId = req.user._id;

        //Use userId to get all user's project ID (distinct will only get projectID field and put it into a list)
        const projectIds = await ProjectAssignee.distinct("projectId", { userId });

        //Use projectId from each ProjectAssignee object to the get Project object
        const projects = await Project.find({
            _id: { $in: projectIds }
        });

        return res.status(200).json({ projects });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * @description: Update Project
 * @param {title} string
 * @param {description} string optional
 * @param {projectId} string
 * 
 * @return status 200
*/
export const updateProject = async (req, res) => {
    const { title } = req.body;
    const description = req.body.description || "";
    const { projectId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageProjectMember(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to modify projects" });
        }

        //Authorize - ensure signed in user is the project author
        const project = await Project.findOne({ _id: projectId, authorId: userId });

        if (!project) {
            return res.status(403).json({ error: "Not authorized to modify projects" });
        }

        project.title = title;
        project.description = description;

        await project.save();

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
};

/**
 * @description: Add Assignee
 * @param {assigneeId} string
 * @param {projectId} string
 * 
 * @return status 200
*/
export const addAssignee = async (req, res) => {
    const { assigneeId } = req.body;
    const { projectId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageProjectMember(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to add users to projects" });
        }

        //Authorize - ensure signed in user is the project author
        const project = await Project.findOne({ _id: projectId, authorId: userId });

        if (!project) {
            return res.status(403).json({ error: "Not authorized to add users to projects" });
        }

        //Verify that assignee doesn't belong to the project (only add new user to project)
        const existingAssignee = await ProjectAssignee.findOne({ userId: assigneeId });

        if (existingAssignee) {
            return res.status(400).json({ error: "User already exist in the project" });
        }

        //Create ProjectAssignee object
        await ProjectAssignee.create({ projectId, userId: assigneeId });

        return res.sendStatus(200);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * @description: Remove Assignee
 * @param {assigneeId} string
 * @param {projectId} string
 * 
 * @return status 200
*/
export const removeAssignee = async (req, res) => {
    const { assigneeId } = req.body;
    const { projectId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageProjectMember(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to remove users from the project" });
        }

        //Authorize - ensure signed in user is the project author
        const project = await Project.findOne({ _id: projectId, authorId: userId });

        if (!project) {
            return res.status(403).json({ error: "Not authorized to remove users from the project" });
        }

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: "Invalid project id" });
        }

        //Verify that the assignee belongs to the project before removing them
        const existingAssignee = await ProjectAssignee.findOne({ projectId, userId: assigneeId });

        if (!existingAssignee) {
            return res.status(400).json({ error: "User not found in the project" });
        }

        //Delete ProjectAssignee object
        await ProjectAssignee.deleteOne({ projectId, userId: assigneeId });

        return res.sendStatus(200);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * @description: Delete Project
 * @param {projectId} string 
 * 
 * @return status 200
 */
export const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canManageProject(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to delete projects" });
        }

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: "Invalid project id" });
        }

        //Delete all the project assignee
        await ProjectAssignee.deleteMany({ projectId });

        //Delete project
        await Project.deleteOne({ _id: projectId });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};