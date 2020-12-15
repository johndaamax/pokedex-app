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


export const getGenerationVersionGroups = (generation = 'latest') => {

    if (generation === 1 || generation === '1' || generation === 'i') {
        return ['yellow', 'red-blue'];
    } else if (generation === 2 || generation === '2' || generation === 'ii') {
        return ['crystal', 'gold-silver'];
    } else if (generation === 3 || generation === '3' || generation === 'iii') {
        return ['emerald', 'firered-leafgreen', 'ruby-sapphire'];
    } else if (generation === 4 || generation === '4' || generation === 'iv') {
        return ['heartgold-soulsilver', 'platinum', 'diamond-pearl'];
    } else if (generation === 5 || generation === '5' || generation === 'v') {
        return ['black-2-white-2', 'black-white'];
    } else if (generation === 6 || generation === '6' || generation === 'vi') {
        return ['omega-ruby-alpha-sapphire', 'x-y'];
    } else if (generation === 7 || generation === '7' || generation === 'vii') {
        return ['ultra-sun-ultra-moon', 'sun-moon'];
    } else if (generation === 8 || generation === '8' || generation === 'viii' || generation === 'latest') {
        return ['sword-shield'];
    } else {
        return [];
    }
}