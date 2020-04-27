const wpApiAddress = "./../ilzenbergasapi/wp-json/";
export const acfPosts = "acf/v3/posts";
export const categoryNews = "categories=2";
export const categoryPark = "categories=3";
export const categoryEvents = "5";
export const categoryContacts = "categories=7";

export function getDataFromWp(endpoint, props) {
    console.log(endpoint, props);
    let finalDestination = wpApiAddress + endpoint;
    if (props){
        let params = new URLSearchParams();
        props.forEach(property => {
            params.append(property.name, property.value); 
        });
        finalDestination = finalDestination + "?" + params.toString();
    };
    return fetch(finalDestination).then((response) => response.json());
}