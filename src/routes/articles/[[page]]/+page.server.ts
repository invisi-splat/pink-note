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

    const pageSizeQuery = url.searchParams.get("pagesize");
    const pageSize = pageSizeQuery ? pageSizeQuery : 10

    // getting featured articles
    const articles = await fetch(`http://localhost:${BACKEND_PORT}/api/articles?${qs.stringify({
        pagination: {
            page: params.page ? params.page : 1,
            pageSize: pageSize
        },
        sort: "Blog.Datetime:desc",
        populate: "*"
    })}`);
    const articles_json = await articles.json();
    console.log(articles_json)


    return {
        imgURLs: imgs_json.map(({ url }: {url: string}) => BACKEND + url), // XXX only doing this because i'm too lazy to fix
        articles_json: articles_json,
        pageSize: pageSize
    };
};