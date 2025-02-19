export default interface PageProps {
    // 'params' will include the dynamic route segment
    params: {
        lang: string
        event_id: string;
    };
}
