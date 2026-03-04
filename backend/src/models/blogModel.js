
import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String },
        content: { type: String },
        imageUrl: { type: String },
        published: { type: Boolean },
        publishedOn: { type: Date },
        rating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        imageSecretUrl: { type: String }
    },
    { timestamps: true }
)

export default mongoose.model("Blog", blogSchema);

