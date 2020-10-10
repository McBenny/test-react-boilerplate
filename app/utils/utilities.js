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
 * @param mixed         set to true to compare strings and numbers in ASCII order
 * @returns {function(*, *): number}
 * Usage:               const mySortedArray = myArray.sort(compareValues('myObjectKey', true));
 * Source:              https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/#creatingadynamicsortingfunction
 */
export function compareValues(key, isAscending = true, mixed = false) {
    return function innerSort(a, b) {
        let comparison = 0;
        let aKey = a[key];
        let bKey = b[key];
        if (mixed) {
            aKey = aKey.toString();
            bKey = bKey.toString();
        }
        if (aKey > bKey) {
            comparison = 1;
        } else if (aKey < bKey) {
            comparison = -1;
        }
        return isAscending ? comparison : comparison * -1;
    };
}

/**
 *
 * @param myArray   The array of objects to sort
 * @param key       The key inside the objects to use to sort
 * @returns {*}     a new array
 * usage:           const mySortedArray = naturalSorting(initialArray, 'sortingKey');
 * source:          https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
 */
export function naturalSorting(myArray, key) {
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    return myArray.sort((a, b) => collator.compare(a[key], b[key]));
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

/**
 * @param date          Provide a date in the form YYYY-MM-DD
 * @returns {string}    Return a date in the form DD/MM/YYYY
 */
export function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}
