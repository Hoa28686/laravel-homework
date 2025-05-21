import React, { useEffect, useState } from "react";
import NameColorCard from "./NameColorCard";
import axios from "axios";

const NameColorList = () => {
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        fetchNameColors();
    }, []);

    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        }
    };

    // add new name and color
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/name-colors", { name, color });
            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };

    // edit name and color
    const handleEdit = async (e, id, newName, newColor) => {
        try {
            await axios.patch(`/api/name-colors/${id}`, {
                name: newName,
                color: newColor,
            });
            fetchNameColors();
        } catch (e) {
            console.error(e);
            setError("Failed to edit entry");
        }
    };
    const handleCancel = () => {};
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/name-colors/${id}`);
            fetchNameColors();
            setMessage("Successfully deleted");
        } catch (e) {
            setError("Failed to delete entry");
        }
    };

    return (
        <div className="container">
            <h1>Name and Color Manager</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit" className="btn btn-default">
                    Add
                </button>
            </form>

            <table className="table" border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {nameColors.map((item) => (
                        <tr key={item.id}>
                            <NameColorCard
                                name={item.name}
                                color={item.color}
                                item={item}
                                onHandleDelete={handleDelete}
                                onHandleEdit={handleEdit}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NameColorList;
