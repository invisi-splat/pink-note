import { BACKEND_PORT, BACKEND } from "$env/static/private";
import qs from "qs";

interface paramsType {
    page: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }: { params: paramsType, url: URL }) { // HACK Define proper type
    // getting pictures
    const n = 10;
    const imgs = await fetch(`http://localhost:${BACKEND_PORT}/api/home/images?count=${n}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const imgs_json = await imgs.json();
    
    const page = Number(params.page) || 1;
    const pageSize = Number(url.searchParams.get("pagesize")) || 10;

    // getting featured articles
    const articles = await fetch(`http://localhost:${BACKEND_PORT}/api/articles?${qs.stringify({
        pagination: {
            page: page,
            pageSize: pageSize
        },
        sort: "Blog.Datetime:desc",
        populate: "*"
    })}`);
    const articles_json = await articles.json();


    return {
        imgURLs: imgs_json.map(({ url }: {url: string}) => BACKEND + url), // XXX only doing this because i'm too lazy to fix
        articles_json: articles_json,
        pageSize: pageSize
    };
};