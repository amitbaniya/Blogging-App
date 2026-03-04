
import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: { type: Number, required: true }
    },
    { timestamps: true }
)

export default mongoose.model("Rating", ratingSchema);

