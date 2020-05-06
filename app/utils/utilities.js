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
        if (a[key].toLowerCase() > b[key].toLowerCase()) {
            comparison = 1;
        } else if (a[key].toLowerCase() < b[key].toLowerCase()) {
            comparison = -1;
        }
        return isAscending ? comparison : comparison * -1;
    };
}
