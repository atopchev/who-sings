/**
 * @param arr 
 * 
 * Returns randomized array via Fisher-Yates Algorithm.
 */
export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};

/**
 * @param array
 * @param callback (async)
 * 
 * For each loop with async / await support.
 */
export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    };
};