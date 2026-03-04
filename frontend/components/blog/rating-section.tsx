'use client'


import Link from "next/link"
import { Rate } from "antd";
import { useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { getRating, saveRating } from "@/lib/rating";
import { useParams } from "next/navigation";
import { RouteParams } from "@/types";
import { useMounted } from "@/lib/hooks";



export default function RatingSection(
    { initialRating, initialRatingCount = 0 }:
        {
            initialRating: number,
            initialRatingCount: number
        }
) {
    const mounted = useMounted()

    const params = useParams<RouteParams>()
    const blogId = params.blogId

    const user = useAppSelector(state => state.auth)
    const [rating, setRating] = useState(initialRating)
    const [ratingCount, setRatingCount] = useState(initialRatingCount);

    const [userRating, setUserRating] = useState<number>(0);
    const [alreadyRated, setAlreadyRated] = useState(false)

    const [isRating, setIsRating] = useState(false)

    useEffect(() => {
        async function ratingStatus() {
            try {
                const rating = await getRating(blogId)
                setUserRating(rating)
                setAlreadyRated(true)
            }
            catch (error) {
                console.log(error)
            }
        }
        if (user.isAuthenticated) {
            ratingStatus()
        }
    }, []);

    async function ratingHandler(newRating: number) {
        setIsRating(true);

        const oldAverage = rating;
        const oldCount = ratingCount;

        let newAverageRating: number;

        if (alreadyRated) {
            newAverageRating = ((oldAverage * oldCount) - userRating + newRating) / oldCount;
        } else {
            newAverageRating = ((oldAverage * oldCount) + newRating) / (oldCount + 1);
            setRatingCount(prev => prev + 1);
            setAlreadyRated(true);
        }

        setRating(Number(newAverageRating.toFixed(1)));
        setUserRating(newRating);

        try {
            const backendRating = await saveRating(blogId, newRating);
            setRating(backendRating.average);
            setRatingCount(backendRating.count);
        } catch (error) {
            console.log(error);
        } finally {
            setIsRating(false);
        }
    }

    if (!mounted) {
        return null
    }

    return (
        <section className="">
            {!user.isAuthenticated ?
                <div className="w-full flex flex-col p-10 border rounded-lg border-gray-500/50 justify-center items-center gap-2">
                    <p className="font-extrabold text-2xl"> Community Rating</p>
                    <p className="opacity-60">Sign in to contribute your rating to this article.</p>

                    <div className="flex flex-col justify-center items-center gap-3">
                        <Rate value={rating} disabled />
                        <p className="font-bold text-orange-600 flex gap-3 items-center">
                            {rating === 0 && ratingCount === 0 ?
                                <>
                                    No reviews yet.</>
                                :
                                <>
                                    Curent Rating: {rating}
                                    {ratingCount != 0 && <span className="text-sm text-gray-500/60">({ratingCount} reviews)</span>}
                                </>
                            }

                        </p>
                    </div>
                    <Link href='/auth' className="p-3 border rounded-xl mt-5 ">Login</Link>
                </div>
                :
                <div className="w-full flex flex-col p-10 border rounded-lg border-gray-500/50 justify-center items-center gap-2">
                    <p className="font-extrabold text-lg"> How would you like to rating this article?</p>
                    <p className="opacity-60">Your feedback helps us improve our content quality.</p>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <p className="font-bold text-orange-600">Your Rating</p>
                        <Rate value={userRating} onChange={ratingHandler} disabled={isRating} />
                        <p className="font-bold text-orange-600 flex gap-3 items-center">
                            {rating === 0 && ratingCount === 0 ?
                                <>
                                    No reviews yet.</>
                                :
                                <>
                                    Average Community Rating: {rating}
                                    {ratingCount != 0 && <span className="text-sm text-gray-500/60">({ratingCount} reviews)</span>}
                                </>
                            }
                        </p>
                    </div>
                </div>
            }
        </section>
    )
}