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