import { BACKEND_PORT, BACKEND } from "$env/static/private";
import qs from "qs";

interface paramsType {
    id: string;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }: { params: paramsType }) { // HACK Define proper type
    const article = await fetch(`http://localhost:${BACKEND_PORT}/api/articles/${params.id}?${qs.stringify({
        populate: "*"
    })}`);
    const article_json = await article.json();

    return {
        article: article_json.data
    };
};