import { useQuery } from '@tanstack/react-query';

const fetchEvents = async (param) => {
    const res = await fetch(`http://localhost:8000/api/events/${param}/`);
    return res.json();
};

const fetchMedia = async () => {
    const res = await fetch('http://localhost:8000/api/media/grouped/');
    return res.json();
};

export const usePageData = (date) => {
    let param = date?.toLocaleDateString('en-GB').split('/').join('-');
    if(!date) {
        const today = new Date();
        param = today.toLocaleDateString('en-GB').split('/').join('-');
    }
    return useQuery({
        queryKey: ['twoApis', param],
        queryFn: async () => {
            const [events, media] = await Promise.all([
                fetchEvents(param),
                fetchMedia(),
            ]);
            return { events, media };
        },
    });
}