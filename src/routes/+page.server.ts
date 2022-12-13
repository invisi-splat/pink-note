import { BACKEND_PORT, BACKEND } from "$env/static/private";

/** @type {import('./$types').PageLoad} */
export async function load() {
    const n = 10; // number of pictures
    const imgs = await fetch(`http://localhost:${BACKEND_PORT}/api/home/images?count=${n}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const imgs_json = await imgs.json();
    return { imgURLs: imgs_json.map( ({ url }: {url: string}) => BACKEND + url )};
};