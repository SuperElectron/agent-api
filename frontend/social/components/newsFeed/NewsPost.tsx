import Image from "next/image";
import {FC} from "react";
import Heart from "./Heart";
import Link from "next/link";

interface CardProps {
    data: {
        event_id: string;
        activity: string;
        image?: string;
        text?: string;
        host: string;
        postTime: string;
        groupName: string;
        date: string;
        price: string;
    };
}

const NewsPost: FC<CardProps> = ({data}: CardProps) => {
    // TODO: add actions to update heart with backend

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-full p-4">
            {/* Top Row: Three Columns */}
            <div className="flex justify-between items-center border-b pb-4">

                {/* Column 1: Avatar, Host, Post Time */}
                <div className="flex items-center gap-3">
                    {/* Host Avatar */}
                    <div
                        className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                        {data.host[0]}
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{data.host} - {data.activity}</p>
                        <p className="text-xs text-gray-500">{data.postTime}</p>
                    </div>
                </div>

                {/* Column 2: Group Name, Date, and Price */}
                <Link href={`/c/event/${data.event_id}`}>
                    <div className="text-right text-sm flex flex-col items-end">
                        <p className="font-semibold mb-1">
                            {data.groupName}
                        </p>

                        <div className="flex gap-2 text-gray-500">
                            <p>📅 {data.date}</p>
                            <p>🎟 Price: {data.price}</p>
                        </div>
                    </div>
                </Link>

                {/* Column 3: Heart Icon */}
                <div className="flex items-center">
                    <Heart/>
                </div>
            </div>

            {/* Text Content */}
            {data.text && (
                <div className="mt-4 text-gray-700 text-sm">
                <p>{data.text}</p>
                </div>
            )}

            {/* Image Content */}
            {data.image && (
                <div className="mt-4 p-2 flex justify-center items-center">
                    <Image
                        alt={data.activity}
                        src={data.image}
                        height={500}
                        width={350}
                    />
                </div>
            )}
        </div>
    );
};

export default NewsPost;
