import Comment from "../models/commentModel.js"
import Blog from "../models/blogModel.js"



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

        await Blog.findByIdAndUpdate(
            blogId,
            { $inc: { commentCount: 1 } }
        );

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

        const comment = req.comment;

        const commentId = req.params.commentId
        await Comment.deleteOne({
            _id: commentId
        })

        await Blog.findOneAndUpdate(
            { _id: comment.blog, commentCount: { $gt: 0 } },
            { $inc: { commentCount: -1 } }
        );

        return res.status(200).json({ message: "Comment deleted successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }

}

export async function getMoreComments(req, res) {
    try {
        const blogId = req.params.blogId
        const { lastCommentId } = req.query;
        if (lastCommentId === undefined || lastCommentId === null) {
            return res.status(404).json({ message: "Not a valid commentId" })
        }
        const comments = await Comment.find({ _id: { $lt: lastCommentId }, blog: blogId })
            .populate({
                path: 'author',
                select: "_id name imageUrl",
            }).sort('-createdAt').limit(5)
        return res.status(200).json({ comments: comments, message: "Comment retrieved successfully" })


    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}
