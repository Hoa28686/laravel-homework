import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FlashCards.css";
const FlashCards = () => {
    const [words, setWords] = useState([]);
    const [flipId, setFlipId] = useState(null);
    const [error, setError] = useState("");
    const [savedFi, setSavedFi] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchWords();
    }, []);

    useEffect(() => {
        axios
            .get("/api/words")
            .then((res) => setSavedFi(res.data.map((word) => word.finnish)))
            .catch((e) => console.error(e));
    }, []);
    const fetchWords = async () => {
        try {
            const res = await axios.get("http://localhost:3001/words");
            setWords(res.data);
        } catch (e) {
            setError("Failed to fetch entries");
        }
    };

    const handleFlip = (id) => {
        setFlipId((prev) => (prev === id ? null : id));
    };

    const handleSave = async (word) => {
        const savedWord = {
            id: word.id,
            finnish: word.finnish,
            english: word.english,
            example: word.example,
        };
        try {
            await axios.post("/api/words", savedWord);
            fetchWords();
            setSavedFi((prev) => [...prev, word.finnish]);
            setMessage("Word saved succesfully!");
        } catch {
            (e) => setError("Failed to post entries");
        }
    };

    const cancelSave = async (finnish) => {
        try {
            const res = await axios.delete(`/api/words/${finnish}`);
            fetchWords();
            setSavedFi((prev) => prev.filter((fi) => fi !== finnish));
            setMessage("Word removed from favorite list!");
        } catch {
            (e) => setError("Failed to delete entries");
        }
    };
    return (
        <div className="container">
            <h1 className="center">Finnish FlashCards</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
            <div className="cardList">
                {words.map((w) => (
                    <div
                        key={w.id}
                        className={`flashCard ${
                            flipId === w.id ? "flipped" : ""
                        }`}
                    >
                        {savedFi.includes(w.finnish) ? (
                            <p
                                className="save"
                                onClick={() => cancelSave(w.finnish)}
                            >
                                ⭐
                            </p>
                        ) : (
                            <p
                                onClick={() => handleSave(w)}
                                className="save unsaved"
                            >
                                ★
                            </p>
                        )}

                        {flipId === w.id ? (
                            <div
                                className="card-back "
                                onClick={() => handleFlip(w.id)}
                            >
                                <h3>{w.english} </h3>
                                <p>eg. {w.example}</p>
                            </div>
                        ) : (
                            <h3 onClick={() => handleFlip(w.id)}>
                                {w.finnish}{" "}
                            </h3>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashCards;
