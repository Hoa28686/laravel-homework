import { useState, useEffect } from "react";
import axios from "axios";
import NameColorList from "./NameColorList";
import FlashCards from "./FlashCards";
import "./App.css";

function App() {
    const [view, setView] = useState("nameColor");

    const toggleView = () => {
        setView((prev) => (prev === "nameColor" ? "flashCards" : "nameColor"));
    };
    return (
        <>
            <button onClick={toggleView} className="toggle-btn">
                Switch to {view === "nameColor" ? "Flashcards" : "Name Color"} →
            </button>
            {view === "nameColor" ? <NameColorList /> : <FlashCards />}
        </>
    );
}

export default App;
