import { BACKEND_PORT } from "$env/static/private";
import qs from "qs";

interface paramsType {
    id: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }: { params: paramsType, url: URL }) {
    const article = await fetch(`http://localhost:${BACKEND_PORT}/api/articles/${params.id}?${qs.stringify({
        populate: "*"
    })}`);
    const article_json = await article.json();
    const returnPage = Number(url.searchParams.get("r")) || 1;
    const returnPageSize = Number(url.searchParams.get("s")) || 10;

    return {
        article: article_json.data,
        returnPage: returnPage,
        returnPageSize: returnPageSize
    };
};