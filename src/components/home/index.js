import React, { useState, useEffect } from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import fetchJsonp from "fetch-jsonp";
import CloseIcon from '@material-ui/icons/Close';
import "./index.scss"

const Home = () => {
    const [search, setSearch] = useState("");
    const [suggests, setSuggest] = useState([]);
    const [focus, setFocus] = useState(false);
    console.log(focus);
    const API_URL =
        "http://suggestqueries.google.com/complete/search?client=youtube&gl=in&q=";

    useEffect(() => {
        search !== "" ? getInfo() : setSuggest([])
    }, [search]);

    const getInfo = () => {
        fetchJsonp(`${API_URL}${search}`)
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                const fetchedData = json[1];
                let suggestions = [];
                fetchedData.forEach(element => {
                    suggestions.push(element[0]);
                });
                search !== "" && setSuggest(suggestions)
                console.log(suggestions);
            })
            .catch(function (ex) {
                console.log("parsing failed", ex);
            });
    };
    const clearSearch = () => {
        setSearch(""); setSuggest([]);
    }
    console.log("SERCH", search);
    return (
        <>
            <div className="nav">
                <ul className="quick-links">
                    <li>Gmail</li>
                    <li>Images</li>
                    <li> <AppsIcon style={{ fontSize: 25, color: "grey" }} /></li>
                    <li><AccountCircleIcon style={{ fontSize: 32, color: "grey" }} /></li>
                </ul>
            </div>
            <div className="logo-space">
                <img className="logo" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" width="272" height="92" />
                <h6>by Sreenaath</h6>
            </div>
            <div className="sbar">
                <div className="bar">
                    <i><SearchIcon style={{ fontSize: 25, color: "grey" }} /></i>
                    <input className="search-bar" value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => { getInfo(); setFocus(true); }} onBlur={() => { setFocus(false); setSuggest([]) }} />
                    {search !== "" && <i className="close-button" onClick={clearSearch}><CloseIcon style={{ fontSize: 20, color: "grey" }} /></i>}
                    <i><MicIcon style={{ fontSize: 25, color: "blue" }} /></i>
                </div>
                {suggests.length > 0 && <hr />}
                {focus && <ul>
                    {suggests.length > 0 && suggests.map((suggest) => { return (<li> <i><SearchIcon style={{ fontSize: 20, color: "grey" }} /></i><span className="highlight">{suggest.slice(0, search.length)}</span>{suggest.slice(search.length, suggest.length)}</li>) })}
                </ul>}
            </div>
            <div className="buttons">
                <button>Google Search</button>
                <button>I'm Feeling Lucky</button>
            </div>
        </>
    )
}



export default Home