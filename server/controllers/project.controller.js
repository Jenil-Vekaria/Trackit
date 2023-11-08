import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import Ticket from "../models/ticket.model.js";
import mongoose from "mongoose";

/**
 * @description: Creates a project
 * @param {title} string 
 * @param {description} string optional
 *  
 * @returns status 200
 */

export const addProject = async (req, res) => {
    const { title, assignees } = req.body;
    const description = req.body.description || "";

    try {
        const userId = req.user._id;

        //Verify if duplicate project exist with same project title
        const existingProject = await Project.findOne({ title, authorId: userId });

        if (existingProject) {
            return res.status(400).json({ message: "Project already exist with that title" });
        }

        if (!assignees.includes(userId.toString())) {
            assignees.push(userId);
        }

        //Create project
        let newProject = await Project.create({ title, description, authorId: userId, assignees });
        newProject = await newProject.populate([
            { path: "authorId", select: ["firstName", "lastName"] }
        ]);

        //Add the new project id to User object's project list
        const updateAssigneeProjectList = [];

        assignees.forEach(userId => {
            //append new project id to the User.projects array
            const updateUser = User.updateOne(
                { _id: userId },
                { $push: { projects: newProject._id } }
            );

            updateAssigneeProjectList.push(updateUser);
        });


        await Promise.all(updateAssigneeProjectList);

        return res.json(newProject);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    };
};

/**
 * @returns Signed in user's project
 */
export const getUserProjects = async (req, res) => {
    try {
        const userId = req.user._id;

        // * Get all the user's projects
        // ? To find documents with array that contains specfic value, you can simply do "assginees: userId", it will return all documents with array containing userId
        const projects = await Project.find({ assignees: userId })
            .populate({ path: "authorId", select: ["firstName", "lastName"] });
        // .populate({ path: "assignees", select: ["firstName", "lastName, roleId"], populate: { path: "roleId", select: ["name"] } });

        return res.json(projects);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

/**
 * @returns get project information
 */
export const getProjectInfo = async (req, res) => {
    const { projectId } = req.params;
    try {
        const userId = req.user._id;

        // Ensure the user belongs to the project
        const project = await Project.find({ _id: projectId, assignees: userId })
            .populate({ path: "authorId", select: { firstName: 1, lastName: 1 } })
            .populate({ path: "assignees", select: { firstName: 1, lastName: 1 }, populate: { path: "roleId", select: { _id: 0, name: 1 } } });

        if (project.length == 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.json(project[0]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
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
    const { title, assignees } = req.body;
    const description = req.body.description || "";
    const { projectId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;

        //Authorize - ensure signed in user is the project author
        let project = await Project.findOne({ _id: projectId, authorId: userId });

        if (!project) {
            return res.status(403).json({ message: "Not authorized to modify projects" });
        }

        //! Prevent self-remove from project
        if (!assignees.includes(userId)) {
            assignees.push(userId.toString());
        }

        //Get all the removed assginee
        const removedAssignees = project.assignees.filter(assigneeId => !assignees.includes(assigneeId.toString()));

        //Unassign all their tickets
        const updateTicketAssigneesPromise = removedAssignees.map(assigneeId => {
            const updateTicketPromise = new Promise(async (resolve, reject) => {
                try {
                    await Ticket.updateMany({ assignees: assigneeId, projectId }, { $pull: { assignees: new mongoose.Types.ObjectId(assigneeId) } });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            return updateTicketPromise;
        });

        await Promise.all(updateTicketAssigneesPromise);

        const assigneesSet = new Set(assignees);

        project.title = title;
        project.description = description;
        project.assignees = Array.from(assigneesSet);
        project.updatedOn = Date.now();

        let updatedProject = await project.save({ new: true });

        updatedProject = await updatedProject.populate([
            { path: "authorId", select: { firstName: 1, lastName: 1 } },
            { path: "assignees", select: { firstName: 1, lastName: 1 }, populate: { path: "roleId", select: { _id: 0, name: 1 } } }
        ]);

        return res.json(updatedProject);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
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

        //Authorize - ensure signed in user is the project author
        const project = await Project.findOne({ _id: projectId, authorId: userId });

        if (!project) {
            return res.status(403).json({ message: "Not authorized to delete project" });
        }

        //Delete project
        await Project.deleteOne({ _id: projectId });

        //Delete all tickets
        await Ticket.deleteMany({ projectId });

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};

/**
 * @description: Delete Project
 * @param {projectId} string 
 * 
 * @return status 200
 */
export const getProjectStat = async (req, res) => {
    const { projectId } = req.params;

    try {
        //Get user permssion
        const userId = req.user._id;

        //Ensure - ensure signed in belongs to the project
        const project = await Project.findOne({ _id: projectId, assignees: userId });

        if (!project) {
            return res.status(403).json({ message: "Not authorized to view project -" });
        }

        const ticketCount = await Ticket.find({ projectId }).count();
        const myTicketCount = await Ticket.find({ projectId, assignees: userId }).count();
        const unassignedTicketCount = await Ticket.find({ projectId, assignees: [] }).count();
        const assignedTicketCount = ticketCount - unassignedTicketCount;
        const ticketStatusCount = await Ticket.aggregate([
            { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
            {
                $group: { _id: "$status", value: { $sum: 1 } }
            }
        ]);
        const ticketTypeCount = await Ticket.aggregate([
            { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
            {
                $group: {
                    _id: "$type",
                    value: { $sum: 1 }
                }
            }
        ]);

        return res.json({
            ticketCount,
            myTicketCount,
            assignedTicketCount,
            unassignedTicketCount,
            ticketStatusCount,
            ticketTypeCount
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server issue" });
    }
};