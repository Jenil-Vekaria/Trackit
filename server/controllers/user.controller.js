import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "role",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                permissions: 1,
                                name: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    fullName: { $concat: ["$firstName", " ", "$lastName"] },
                    role: { $arrayElemAt: ["$role", 0] }
                }
            }
        ]);

        return res.json({ users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};