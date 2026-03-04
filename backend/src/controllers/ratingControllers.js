import Rating from "../models/ratingModel.js"
import Blog from "../models/blogModel.js"



export async function create(req, res) {
    try {

        const userId = req.user._id;
        const { rating } = req.body;
        const blogId = req.params.blogId;

        if (!rating) {
            return res.status(400).json("Rating is required.")

        }
        const newRating = parseInt(rating)

        const ratingExists = await Rating.findOne({ author: userId, blog: blogId })
        let oldUserRating = 0;

        if (ratingExists) {
            oldUserRating = ratingExists.rating;
            ratingExists.rating = newRating;
            await ratingExists.save();
        }
        else {
            await Rating.create({
                blog: blogId,
                author: userId,
                rating: newRating
            })
        }


        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        let newAverage;
        let newCount;
        const oldAverage = blog.rating || 0;
        const oldCount = blog.ratingCount || 0;

        if (ratingExists) {
            newAverage = ((oldAverage * oldCount) - oldUserRating + newRating) / oldCount;
            newCount = oldCount;
        } else {
            newAverage = ((oldAverage * oldCount) + newRating) / (oldCount + 1);
            newCount = oldCount + 1;
        }



        blog.rating = Number(newAverage);
        blog.ratingCount = newCount;


        await blog.save()

        return res.status(200).json({ rating: { average: newAverage, count: newCount }, message: "Rating saved successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }

}

export async function get(req, res) {
    try {
        const blogId = req.params.blogId
        const userId = req.user._id;
        const ratingExists = await Rating.findOne({ author: userId, blog: blogId })
        if (!ratingExists) {
            return res.status(404).json("Rating not found.")
        }
        return res.status(200).json({ rating: ratingExists.rating, message: "Comment retrieved successfully" })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong." })
    }
}
