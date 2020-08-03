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

/**
 * 
 * @param {*} player (string)
 * @param {*} score (int)
 * 
 * Stores given player score to localStorage.
 */
export const storeScore = (player, score) => {
    let existingScores = localStorage.getItem(player);
    existingScores = existingScores ? JSON.parse(existingScores) : {};
    
    console.log("sco", existingScores);
    
    let date = new Date();
    const time = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    date = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    existingScores[date + time] = score;

    localStorage.setItem(player, JSON.stringify(existingScores));
    updateHighScore(player, existingScores);
}
/**
 * 
 * @param {*} player (name)
 * @param {*} existingScores (obj)
 * 
 * Calculate and store highest score in localStorage.
 */
const updateHighScore = (player, existingScores) =>{
    const highScore = Math.max(...Object.values(existingScores));
    localStorage.setItem(`${player}-highest`, highScore);
}

/**
 * returns sorted array of player high score. 
 */
export const getAllHighScores = () => {
    let scores = [];
    for (const [key, value] of Object.entries(localStorage)) {
        if (key.split('-').length > 1) {
            scores.push([key, value]);
        };
    };
    const sortedScores = scores.sort((a, b) => b[1] - a[1] );
    return sortedScores;
}