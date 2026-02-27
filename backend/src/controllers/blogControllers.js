
import Blog from "../models/blogModel.js"
import { v2 as cloudinary } from 'cloudinary';

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
        const { pageNum = 1, searchText, startDate, endDate } = req.query || {};
        const limit = 9;
        const skip = (pageNum - 1) * limit;

        const filter = { published: true };
        if (searchText && searchText != 'undefined') {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
            ];
        }

        if (startDate || endDate) {
            const dateFilter = {};
            if (startDate) {
                dateFilter.$gte = new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                dateFilter.$lte = end;
            }
            if (Object.keys(dateFilter).length > 0) {
                filter.publishedOn = dateFilter;
            }
        }

        const totalBlogs = await Blog.countDocuments(filter)
        const totalPages = Math.ceil(totalBlogs / limit)

        const blogList = await Blog.find(filter)
            .select('author title content imageUrl rating commentCount published createdAt updatedAt publishedOn')
            .populate('author', '_id name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);





        return res.status(200).json({
            blogList, totalPages, message: "Blogs retrieved successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}


export const uploadBlogPicture = async (req, res) => {
    try {
        const blogId = req.params.blogId;

        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const imageUrl = req.file.path;
        const secretUrl = req.file.filename;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            const result = await cloudinary.uploader.destroy(secretUrl);
            console.log("Delete result:", result);
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.imageSecretUrl) {
            const previousImage = await cloudinary.uploader.destroy(blog.imageSecretUrl);
            console.log("Delete result Previous Image:", previousImage);
        }
        blog.imageUrl = imageUrl;
        blog.imageSecretUrl = secretUrl;
        const savedBlog = await blog.save();

        return res.status(200).json({ updatedAt: savedBlog.updatedAt, message: 'Blog picture uploaded successfully' })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getAllPublisher(req, res) {
    try {
        const userId = req.user._id
        const { pageNum = 1, searchText, startDate, endDate } = req.query || {};
        const limit = 9;
        const skip = (pageNum - 1) * limit;

        const filter = { author: userId };
        if (searchText && searchText != 'undefined') {
            filter.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
            ];
        }

        if (startDate || endDate) {
            const dateFilter = {};
            if (startDate) {
                dateFilter.$gte = new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                dateFilter.$lte = end;
            }
            if (Object.keys(dateFilter).length > 0) {
                filter.publishedOn = dateFilter;
            }
        }

        const totalBlogs = await Blog.countDocuments(filter)
        const totalPages = Math.ceil(totalBlogs / limit)

        const blogList = await Blog.find(filter)
            .select('author title content imageUrl rating commentCount published createdAt updatedAt publishedOn')
            .populate('author', '_id name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);


        return res.status(200).json({
            blogList, totalPages, message: "Blogs retrieved successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}



