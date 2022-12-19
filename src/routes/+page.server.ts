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
    const articles = await fetch(`http://localhost:${BACKEND_PORT}/api/articles?${qs.stringify({
        pagination: {
            page: 1,
            pageSize: 10 /* ten recent articles (page 1) */
        },
        sort: "Blog.Datetime:desc",
        populate: "*"
    })}`);
    const articles_json = await articles.json();
    const featuredArticles = articles_json.data.slice(0, 3); /* only 3 featured articles */
    const recentArticles = articles_json.data.slice(3, 10); /* remaining 7 */

    const announcements = await fetch(`http://localhost:${BACKEND_PORT}/api/announcements?${qs.stringify({
        pagination: {
            page: 1,
            pageSize: 1
        },
        populate: "*"
    })}`);
    const announcements_json = await announcements.json();

    return {
        imgURLs: imgs_json.map(({ url }: {url: string}) => BACKEND + url), // XXX only doing this because i'm too lazy to fix
        featuredArticles: featuredArticles,
        articles: recentArticles,
        announcements: announcements_json.data
    };
};