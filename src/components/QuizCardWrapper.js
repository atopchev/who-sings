import React, { Component } from 'react';
import QuizCard from './QuizCard';
import { asyncForEach } from '../helpers';

/** 
 * This wrapper component for the purpose of making all 
 *      necessary API calls. 
 * First, it fetches n * 2 artists, to create a pool of options 
 *      for quiz answer choices. 
 * Second, it fetches n tracks, and the lyrics for each track. 
 * Lasty, it renders the actual QuizComponent with appropriate data. 
 */
class QuizCardWrapper extends Component {
    constructor(props) {
        super(props);
        this.key = process.env.REACT_APP_API_KEY;
        this.handleNewGame = this.handleNewGame.bind();
    }

    state = {
        numQuestions: 3, 
        tracks: [],
        artistChoices: [],
        attempted: false,
        lyricIdx: 0,
        score: 0
    };

    fetchTracks = async (key) => {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=hot&page=1&page_size=${this.numQuestions}&country=us&f_has_lyrics=1&apikey=${key}`);
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
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=${this.state.numQuestions * 2}&country=us&apikey=${key}`);
        const json = await res.json();
        const names = [];
        json.message.body.artist_list.forEach(({ artist }) => names.push(artist.artist_name));
        return names;
    };

    handleNewGame() {
        this.setState({
            // artistChoices: this.fetchArtists(this.key)
            // tracks: this.fetchTracks(this.key),
            tracks: [
                {
                    track: {
                        lyrics: "hey there delilah what's it like in NYC...",
                        artist_name: "Plain White Tees",
                        name: "Hey there delilah"
                    }
                },
                {
                    track: {
                        lyrics: "hey jude...",
                        artist_name: "The Beatles",
                        name: "Hey jude"
                    }
                },
                {
                    track: {
                        lyrics: "california, knows how to party, californiaaa, knows how...",
                        artist_name: "tupac",
                        name: "california"
                    }
                },
            ],
            artists: ['taylor', 'harry', 'hermione', 'ron', 'snape', 'dumbledore', 'bill', 'sally', 'angela', 'alissa']
        })
    }

    componentDidMount() {
        this.setState({
            // artistChoices: this.fetchArtists(this.key)
            // tracks: this.fetchTracks(this.key),
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
        })
    };

    render() {
        if (!this.state.artistChoices.length || !this.state.tracks.length) return null;
        return (
            <QuizCard state={this.state} handleNewGame={this.handleNewGame}/> 
        )
    };
};

export default QuizCardWrapper;



