'use server';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/utils";
import NewsFeed from "@/components/NewsFeed/Feed";

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
    // console.table(news[0]);

    // TODO: create post data (news feed to promote events)
    // TODO: create event data (different search)
    return (
        <NewsFeed news={news} />
    );
}
