import { v4 as uuidv4 } from 'uuid';
import { UUID_PREFIX } from '../containers/Settings/constants';

/**
 * Generates a unique gameId
 * @returns {string} starting with UUID_PREFIX
 */
export function generateId() {
    return `${UUID_PREFIX}${uuidv4()}`;
}

/**
 * This function sorts an array of object by ascending order of the key provided, by default.
 * @param key           The object key to sort on (No test about its existence)
 * @param isAscending   Setting this to false requests a descending order
 * @returns {function(*, *): number}
 * Usage:               const mySortedArray = myArray.sort(compareValues('myObjectKey', true);
 * Source:              https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/#creatingadynamicsortingfunction
 */
export function compareValues(key, isAscending = true) {
    return function innerSort(a, b) {
        let comparison = 0;
        if (a[key] > b[key]) {
            comparison = 1;
        } else if (a[key] < b[key]) {
            comparison = -1;
        }
        return isAscending ? comparison : comparison * -1;
    };
}

/**
 * This function returns true if the given number is even, false otherwise
 * @param n {number}
 * @returns {boolean}
 * https://stackoverflow.com/questions/6211613/testing-whether-a-value-is-odd-or-even#answer-6211660
 */
export function isEven(n) {
    return Number(n) % 2 === 0;
}
