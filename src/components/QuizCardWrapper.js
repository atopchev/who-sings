import React, { Component } from 'react'
import QuizCard from './QuizCard'

/**
 * 
 * This wrapper component for the purpose of making all 
 *      necessary API calls. 
 * 
 * First, it fetches n * 2 artists, to create a pool of options 
 *      for quiz answer choices. 
 * 
 * Second, it fetches n tracks, and the lyrics for each track. 
 * 
 * Lasty, it renders the actual QuizComponent with appropriate data. 
 *
 */
class QuizCardWrapper extends Component {

    state = {
        n: 5, // RENAME => num Qs
        tracks: [],
        artists: [], //  RENAME => incorrectArtists
        attempted: false,
        lyricIdx: 0,
        score: 0
    };

    fetchTracks = async (key) => {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=hot&page=1&page_size=${this.state.n}&country=us&f_has_lyrics=1&apikey=${key}`);
        const json = await res.json();
        const tracks = json.message.body.track_list;
        asyncForEach(tracks, async ({ track }) => {
            const resLyric = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track.track_id}&apikey=${key}`)
            const jsonLyric = await resLyric.json();
            track['lyrics'] = jsonLyric.message.body.lyrics.lyrics_body;
        })

        return tracks;
    };

    fetchArtists = async (key) => {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=${this.state.n * 2}&country=us&apikey=${key}`);
        const json = await res.json();
        const names = [];
        json.message.body.artist_list.forEach(({ artist }) => names.push(artist.artist_name));
        return names;
    };

    componentDidMount() {
        const key = process.env.REACT_APP_API_KEY;
        this.setState({
            // artists: this.fetchArtists(key)
            // tracks: this.fetchTracks(key),
            tracks: [
                    {track: {
                        lyrics: "hey there delilah what's it like in NYC...",
                        artist_name: "Plain White Tees",
                        name: "Hey there delilah"
                    }},
                    {track: {
                        lyrics: "hey jude...",
                        artist_name: "The Beatles",
                        name: "Hey jude"
                    }},
                    {track: {
                        lyrics: "california, knows how to party, californiaaa, knows how...",
                        artist_name: "tupac",
                        name: "california"
                    }},
                ],
            artists: ['taylor', 'harry', 'hermione', 'ron', 'snape', 'dumbledore', 'bill', 'sally', 'angela', 'alissa']
        }, () => console.log('async: ', this.state))
    }

    render() {
        if (!this.state.artists.length || !this.state.tracks.length) return null;
        console.log('quizwrapper', this.state.tracks)

        return (
            <QuizCard state={this.state}/> 
        )
    };
};

export default QuizCardWrapper;

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    };
};

