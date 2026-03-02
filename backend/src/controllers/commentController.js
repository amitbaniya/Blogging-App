
import Comment from "../models/commentModel.js"


export async function create(req, res) {
    try {

        const userId = req.user._id;
        const { content } = req.body;
        const blogId = req.params.blogId;
        const comment = await Comment.create({
            blog: blogId,
            author: userId,
            content
        })

        const populatedComment = await comment.populate({
            path: "author",
            select: "_id name imageUrl",
        });



        return res.status(200).json({ comment: populatedComment, message: "Comment created successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }

}

export async function remove(req, res) {
    try {

        const commentId = req.params.commentId
        const comment = await Comment.deleteOne({
            _id: commentId
        })

        return res.status(200).json({ message: "Comment deleted successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }

}
