import Comment from "../models/commentModel.js"

export async function commentProtect(req, res, next) {
    const commentId = req.params.commentId;
    const userId = req.user._id
    try {
        const comment = await Comment.findById(commentId)
            .populate({
                path: "blog",
                select: "author"
            });



        if (comment.author !== userId && comment.blog.author !== userId) {
            return res.status(401).json({ message: "You are not authorized for this comment." })
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "You are not authroized for this comment" })
    }
}
