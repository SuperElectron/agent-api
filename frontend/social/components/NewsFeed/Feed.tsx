'use client';

import NewsPost from "@/components/NewsFeed/NewsPost";
import React from "react";

interface NewsFeedProps {
    news: any;
}

const NewsFeed: React.FC<NewsFeedProps> = ({news}: NewsFeedProps) => {
    return (
        <div className="flex-1 w-full h-full overflow-hidden">
            {news && news.length > 0 ? (
                <div className="flex flex-col w-full h-full gap-6 items-center overflow-y-auto p-4 md:p-8"> {/* Make this div scrollable */}
                    {news.map((item: any) => (
                        <div
                            key={item.id}
                            className="w-full sm:w-3/4 lg:w-1/2 px-2" // Adjust widths dynamically
                        >
                            <NewsPost
                                data={{
                                    event_id: item.id,
                                    activity: item.activity,
                                    image: item.image,
                                    text: item.text,
                                    host: item.host || "Host",
                                    postTime: "2024-11-16",
                                    groupName: item.group_name,
                                    date: item.date || "2024-11-16",
                                    price: item.price,
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No news available at the moment.</p>
            )}
        </div>
    );
}

export default NewsFeed;
