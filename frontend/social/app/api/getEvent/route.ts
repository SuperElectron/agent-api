// import {NextResponse} from "next/server";
//
//
// export async function GET(request: Request) {
//     const requestUrl = new URL(request.url);
//     const query = requestUrl.searchParams.get("q");
//     console.log(`called route findCity for q=${query}`);
//
//     if (!query) {
//         return NextResponse.json(
//             {error: "Query parameter 'q' is required"},
//             {status: 400}
//         );
//     }
//
//     try {
//         // Use OpenStreetMap Nominatim API
//         const response = await fetch(
//             `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//                 query
//             )}&format=json&addressdetails=1&limit=1`
//         );
//
//         if (!response.ok) {
//             throw new Error("Failed to fetch cities from OpenStreetMap");
//         }
//         console.table(response);
//         const data: any[] = await response.json();
//
//         // Map API results into the City type
//         const cities: City[] = data.map((item) => ({
//             location_name: item.display_name,
//             geo_location: [parseFloat(item.lat), parseFloat(item.lon)],
//         }));
//
//         return NextResponse.json(cities);
//     } catch (error) {
//         console.error("Error fetching cities:", error);
//         return NextResponse.json({error: "Failed to fetch cities"}, {status: 500});
//     }
// }
