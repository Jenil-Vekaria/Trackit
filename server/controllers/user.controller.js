import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            [
                {
                    $lookup: {
                        from: "userroles",
                        localField: "_id",
                        foreignField: "userId",
                        as: "userRole",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "roles",
                                    localField: "roleId",
                                    foreignField: "_id",
                                    as: "roleName"
                                }
                            },
                            {
                                $set: { roleName: { $arrayElemAt: ["$roleName.name", 0] } }
                            }
                        ]
                    }
                },
                {
                    $set: { userRole: { $arrayElemAt: ["$userRole.roleName", 0] } }
                },
                {
                    $project: {
                        fullName: { $concat: ["$firstName", " ", "$lastName"] },
                        role: "$userRole"
                    }
                }
            ]
        ]);

        return res.json({ users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};