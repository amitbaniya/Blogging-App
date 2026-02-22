
import User from "../models/userModel.js"
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

export async function save(req, res) {
    try {
        const { blogId, title, content, imageUrl } = req.body;

        const blog = await Blog.findByIdAndUpdate(blogId, { title, content, imageUrl }, { new: true })
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" })
        }
        return res.status(200).json({ message: "Blog saved successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong." })
    }

}

async function getBlogInternal(blogId) {
    try {


        const blog = await Blog.findById(blogId)

        return blog;
    }
    catch (error) {
        throw new Error(error)
    }
}

export async function publish(req, res) {

    try {
        const blogId = req.params.blogId;

        const blog = await getBlogInternal(blogId);
        if (!blog) {
            return res.status(404).json({ message: "No Blog found!" })
        }

        blog.published = true;

        await blog.save();
        return res.status(200).json({ message: "Blog published successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}

export async function getBlog(req, res) {
    try {

        const blogId = req.params.blogId;

        const blog = await getBlogInternal(blogId);

        if (!blog) {
            return res.status(404).json({ message: "No Blog found!" })
        }

        return res.status(200).json({ blog, message: "Blog retrived successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server error." })
    }
}



