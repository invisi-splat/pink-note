import { BACKEND_PORT, BACKEND } from "$env/static/private";
import qs from "qs";

/** @type {import('./$types').PageLoad} */
export async function load() {
    // getting pictures
    const n = 10;
    const imgs = await fetch(`http://localhost:${BACKEND_PORT}/api/home/images?count=${n}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const imgs_json = await imgs.json();

    // getting featured articles
    const featuredArticles = await fetch(`http://localhost:${BACKEND_PORT}/api/articles?${qs.stringify({
        pagination: {
            page: 1,
            pageSize: 10
        },
        populate: "*"
    })}`);
    const featuredArticles_json = await featuredArticles.json();

    return {
        imgURLs: imgs_json.map(({ url }: {url: string}) => BACKEND + url), // only doing this because i'm too lazy to fix
        featuredArticles: featuredArticles_json.data
    };
};