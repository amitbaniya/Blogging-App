
import Blog from "../models/blogModel.js"

export async function blogProtect(req, res, next) {
    const blogId = req.params.blogId;
    const userId = req.user._id
    try {
        const blogBelongs = await Blog.exists({ _id: blogId, author: userId })

        if (!blogBelongs) {
            return res.status(401).json({ message: "You are not authorized for this blog." })
        }

        next()
    } catch (error) {
        res.status(401).json({ message: "You are not authroized for this blog" })
    }
}
