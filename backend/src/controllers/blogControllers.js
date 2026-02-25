
import Blog from "../models/blogModel.js"

export async function create(req, res) {
    try {
        const { _id } = req.user
        const blog = await Blog.create({
            author: _id
        })
        return res.status(200).json({ blogId: blog._id, message: "Blog created successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong." })
    }
}

export async function getBlog(req, res) {
    try {

        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId)
            .select('author title content imageUrl published createdAt updatedAt -_id publishedOn')
            .populate('author', '_id, name');

        if (!blog) {
            return res.status(404).json({ message: "No Blog found!" })
        }

        return res.status(200).json({
            blog,
            message: "Blog retrived successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server error." })
    }
}

export async function save(req, res) {
    try {
        const { title, content, imageUrl } = req.body;
        const blogId = req.params.blogId;
        const blog = await Blog.findByIdAndUpdate(blogId, { title, content, imageUrl }, { returnDocument: 'after' })
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" })
        }
        return res.status(200).json({ updatedAt: blog.updatedAt, message: "Blog saved successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong." })
    }

}

export async function publish(req, res) {

    try {
        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "No Blog found!" })
        }

        blog.published = !blog.published;
        blog.publishedOn = new Date();
        await blog.save();
        return res.status(200).json({ message: "Blog published successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}


export async function getAll(req, res) {

    try {
        const { pageNum = 1 } = req.body || {};
        const limit = 9;
        const skip = (pageNum - 1) * limit;

        const blogList = await Blog.find({ published: true })
            .select('author title content imageUrl rating commentCount published createdAt updatedAt publishedOn')
            .populate('author', '_id, name')
            .sort({ 'createdAt': -1 })
            .skip(skip).limit(limit);

        if (blogList.length === 0) {
            return res.status(404).json({ message: "No Blogs found!" })
        }

        return res.status(200).json({ blogList, message: "Blogs retrieved successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}



