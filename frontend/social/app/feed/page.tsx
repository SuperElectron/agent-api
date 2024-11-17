import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
import NewsPost from "@/components/newsFeed/NewsPost";

export default async function NewsPage() {
    const supabase = await createClient();
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (!userData) {
        return redirect("/sign-in");
    }
    if (authError) {
        return encodedRedirect("error", "/sign-in", authError.message);
    }

    // Fetch news feed
    const { data: news, error: newsError } = await supabase.from("events").select("*");
    if (newsError) {
        console.error("Error fetching signal feed:", newsError.message);
        return (
            <div className="text-red-500">
                Error loading news feed: {newsError.message}
            </div>
        );
    }
    // console.table(news);

    // TODO: create post data (news feed to promote events)
    // TODO: create event data (different search)
    return (
        <div className="flex-1 w-full flex flex-col gap-6 p-4 md:p-8">
            {news && news.length > 0 ? (
                <div className="flex flex-col gap-6 items-center">
                    {news.map((item) => (
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
