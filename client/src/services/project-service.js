const getMyProjects = () => {
    return {
        url: `/project`,
        method: "get"
    };
};

const createProject = (data) => {
    return {
        url: "/project",
        data,
        method: "post"
    };
};

const updateProject = (data, projectId) => {
    return {
        url: `/project/${projectId}`,
        data,
        method: "patch"
    };
};

const getProjectInfo = (projectId) => {
    return {
        method: "get",
        url: `/project/${projectId}`
    };
};

const deleteProject = (projectId) => {
    return {
        method: "delete",
        url: `/project/${projectId}`
    };
};

const getProjectStats = (projectId) => {
    return {
        method: "get",
        url: `/project/stat/${projectId}`
    };
};

const ProjectService = {
    getMyProjects,
    createProject,
    getProjectInfo,
    updateProject,
    deleteProject,
    getProjectStats
};

export default ProjectService;