/**
 * @param {*} key (string)
 * @param {*} n (int)
 * Makes API call to MusiXmatch. Fetches N tracks and their lyrics.
 */
export const fetchTracksAndLyrics = async (key, n) => {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=hot&page=1&page_size=${n}&country=us&f_has_lyrics=1&apikey=${key}`
    );
    const json = await res.json();
    const tracks = json.message.body.track_list;
    asyncForEach(tracks, async ({ track }) => {
        const resLyric = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track.track_id}&apikey=${key}`);
        const jsonLyric = await resLyric.json();
        track["lyrics"] = jsonLyric.message.body.lyrics.lyrics_body
        .split("\n")
        .slice(0, 2)
        .join("\n\r");
    });
    debugger;

    return tracks;
};

/**
 * @param {*} key (string)
 * @param {*} n (int)
 * Makes API call to MusiXmatch. Fetches N tracks and their lyrics.
 */
export const fetchArtists = async (key, n) => {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=${n*2}&country=us&apikey=${key}`);
    const json = await res.json();
    const names = [];
    json.message.body.artist_list.forEach( ({ artist }) => names.push(artist.artist_name) );
    debugger;
    return names;
};

/**
 * @param arr 
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
 * For each loop with async / await support.
 */
export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    };
};

/**
 * @param {*} player (string)
 * @param {*} score (int)
 * Stores given player score to localStorage.
 */
export const storeScore = (player, score) => {
    let existingScores = localStorage.getItem(player);
    existingScores = existingScores ? JSON.parse(existingScores) : {};    
    let date = new Date();
    const time = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    date = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    existingScores[date + time] = score;
    localStorage.setItem(player, JSON.stringify(existingScores));
    updateHighScore(player, existingScores);
}
/**
 * @param {*} player (name)
 * @param {*} existingScores (obj)
 * Calculate and store highest score in localStorage.
 */
const updateHighScore = (player, existingScores) =>{
    const highScore = Math.max(...Object.values(existingScores));
    localStorage.setItem(`${player}-highest`, highScore);
}

/**
 * Returns sorted array of player high score. 
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

/**
 * Fake state for testing sans API calls
 */
        // tracks: [
        //   {
        //     track: {
        //       lyrics: "hey there delilah what's it like in NYC...",
        //       artist_name: "Plain White Tees",
        //       name: "Hey there delilah",
        //     },
        //   },
        //   {
        //     track: {
        //       lyrics: "hey jude...",
        //       artist_name: "The Beatles",
        //       name: "Hey jude",
        //     },
        //   },
        //   {
        //     track: {
        //       lyrics:
        //         "california, knows how to party, californiaaa, knows how...",
        //       artist_name: "tupac",
        //       name: "california",
        //     },
        //   },
        // ],
        // artistChoices: [
        //   "taylor",
        //   "harry",
        //   "hermione",
        //   "ron",
        //   "snape",
        //   "dumbledore",
        //   "bill",
        //   "sally",
        //   "angela",
        //   "alissa",
        //   "bryce",
        //   "bakari",
        //   "julie",
        //   'ian',
        //   'Janice',
        //   'Jill',
        // ],