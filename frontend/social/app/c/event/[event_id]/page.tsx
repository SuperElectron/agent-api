import {createClient} from "@/utils/supabase/server";
import Image from "next/image";
import {redirect} from "next/navigation";
import {encodedRedirect} from "@/utils/utils";

export default async function EventPage({ params }: { params: { event_id: string } }) {
    if (!params || !params.event_id) {
        throw new Error("Invalid or missing event ID");
    }

    const supabase = await createClient();
    const {data,} = await supabase.auth.getUser();
    if (!data) {
        return redirect("/sign-in");
    }

    // Validate that params.id exists and matches UUID format
    if (!params.event_id || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(params.event_id)) {
        console.error("Invalid UUID provided:", params.event_id);
        return {error: "Invalid event ID"};
    }
    // console.table(params);

    // Fetch the event data
    const {data: eventData, error} = await supabase
        .from("events")
        .select("*")
        .eq("id", params.event_id);
    if (error) {
        console.error("Error fetching event data:", error.message);
        encodedRedirect("error", "/feed", error.message);
    }
    // console.table(eventData);

    // RETURN 404 PAGE IF DATABASE CANNOT PULL DATA PROPERLY
    if (!eventData) {
        console.error(`Error fetching event data: no data found for id (${params.event_id})`);
        return (
            <div> Oops something went wrong here [db-1000]</div>
        )
    }

    // console.table(eventData);
    const event = {
        title: eventData[0].activity,
        hostName: eventData[0].host,
        hostAvatar: eventData[0].host_avatar || "/avatar/avatar.png",
        imageSrc: eventData[0].image,
        groupName: eventData[0].group_name,
        groupType: eventData[0].category,
        date: eventData[0].start_date,
        recurrence: eventData[0].frequency,
        eventType: eventData[0].event_type || "In-person",
        details: eventData[0].details,
        price: eventData[0].price,
        spotsLeft: eventData[0].spots || '5',
    };

    return (
        <div className="flex flex-col items-center w-full p-4 text-gray-800">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                {/* Event Title */}
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>

                {/* Host Section */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                            src={event.hostAvatar}
                            alt={`${event.hostName}'s Avatar`}
                            width={48}
                            height={48}
                            // className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Hosted By</p>
                        <p className="text-base font-medium text-gray-800">{event.hostName}</p>
                    </div>
                </div>

                {/* Event Image */}
                <div className="mt-6 p-2 rounded-lg overflow-hidden flex justify-center items-center">
                    <Image
                        src={event.imageSrc}
                        alt={event.title}
                        width={800}
                        height={400}
                        className="justify-center object-cover w-3/5"
                    />
                </div>

                {/* Event Details */}
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="flex-1">
                        <p className="text-gray-700 whitespace-pre-line">{event.details}</p>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-base font-semibold">{event.groupName}</p>
                            <p className="text-sm text-gray-500">{event.groupType}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">📅 {event.date}</p>
                            <p className="text-sm text-gray-500">{event.recurrence}</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">💻 {event.eventType}</p>
                        </div>
                    </div>
                </div>

                {/* Call-to-Actions */}
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        <p className="text-base text-gray-500">Title: {event.title}</p>
                        <p className="text-base font-bold text-gray-900">🎟 Price: {event.price}</p>
                        <p className="text-base font-bold text-red-500">Spots left: {event.spotsLeft}</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 border rounded-md text-gray-800 hover:bg-gray-200">
                            Share
                        </button>
                        <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            Attend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
