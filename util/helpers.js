import _ from 'lodash'

export const isObjectInArray = (array, target) => {
    let isIn = false;
    for (let obj of array) {
        if (_.isEqual(obj, target)) {
            isIn = true;
            break;
        }
    }
    return isIn;
}

export const getIdFromURL = (url) => {
    //method that extracts the pokemon ID from a URL
    //ex. extracts the 10103 from the URL 'https://pokeapi.co/api/v2/pokemon/10103/'
    const arr = _.split(url, '/');
    const id = arr[arr.length - 2];
    return id;
}

export const truncText = (text = '', max = 350) => {
    if (!text) return null;
    if (text.length < max) {
        return text;
    }
    const substr = text.substring(0, max);

    return `${substr.substring(0, substr.lastIndexOf(' ')).trimRight()}...`;
};
