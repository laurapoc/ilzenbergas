const wpApiAddress = "./../ilzenbergasapi/wp-json/";
export const acfPosts = "acf/v3/posts";
export const acfNews = "acf/v3/news";
export const acfContacts = "acf/v3/contacts";
export const acfPark = "acf/v3/park";
export const acfEvents = "acf/v3/events";
export const acfExcursions = "acf/v3/excursions";
export const acfTastings = "acf/v3/tastings";
export const acfAccommodation = "acf/v3/accommodation";
export const acfHomepage = "acf/v3/homepage";
export const acfRestaurant = "acf/v3/restaurant";
export const acfPotato = "acf/v3/potato";
export const acfFarm = "acf/v3/farm";
export const acfProducts = "acf/v3/products";
export const acfWater = "acf/v3/water";
export const acfWine = "acf/v3/wine";
export const acfShopping = "acf/v3/shopping";
export const acfAgriculture = "acf/v3/agriculture";
export const acfPrinciples = "acf/v3/principles";



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