const wpApiAddress = "./../ilzenbergasapi/wp-json/";
export const acfPosts = "acf/v3/posts";
export const categoryNews = "categories=2";

export function getDataFromWp(endpoint, props) {
    console.log(endpoint, props);
    let finalDestination = wpApiAddress + endpoint;
    return fetch(finalDestination).then((response) => response.json());
}