import { imgNum } from "$lib/assets/title_imgs/index";

/** @type {import('./$types').PageLoad} */
export async function load() {
    const imgURLs: any[] = [];
    const n = 10; // number of pictures
    let x;
    for (let i = 0; i < n; i++) {
        const chosenImgId = Math.floor(Math.random() * imgNum)
        x = await import(`$lib/assets/title_imgs/${chosenImgId}.jpg`);
        imgURLs.push(x);
    }
    return {
        imgURLs: imgURLs
    }
}