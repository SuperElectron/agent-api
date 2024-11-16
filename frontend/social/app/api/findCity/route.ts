import {NextResponse} from "next/server";
import {LocationValue} from "@/types/locationType";


export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const query = requestUrl.searchParams.get("q");
    console.log(`called route findCity for q=${query}`);

    if (!query) {
        return NextResponse.json(
            {error: "Query parameter 'q' is required"},
            {status: 400}
        );
    }

    try {
        // Use OpenStreetMap Nominatim API
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                query
            )}&format=json&addressdetails=1&limit=1`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch cities from OpenStreetMap");
        }
        console.table(response);
        const resp: any[] = await response.json();
        const city: LocationValue = {
            location: resp[0].display_name,
            geo_location: [parseFloat(resp[0].lat), parseFloat(resp[0].lon)],
        };

        return NextResponse.json(city);
    } catch (error) {
        console.error("Error fetching cities:", error);
        return NextResponse.json({error: "Failed to fetch cities"}, {status: 500});
    }
}
