import mongoose from "mongoose";
import * as permissionCheck from "../util/permissionCheck.js";
import Project from "../models/project.model";
import ProjectAssignee from "../models/projectAssignee.model.js";
import { getUserRole } from "../util/utils.js";

export const addProject = async (req, res) => {
    const { title, description } = req.body;

    try {
        //Get user permssion
        const userId = req.user._id;
        const userRole = await getUserRole(userId);

        if (!permissionCheck.canAddProject(userRole.permissions)) {
            return res.status(403).json({ error: "Not authorized to add projects" });
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

export const getUserProjects = async (req, res) => {

};

export const updateProject = async (req, res) => {

};

export const deleteProject = async (req, res) => {

};

export const addAssignee = async (req, res) => {

};

export const removeAssignee = async (req, res) => {

};