import axios from "axios";
import { useState } from "react";
import "./App.css";

const NameColorCard = ({ name, color, item, onHandleDelete, onHandleEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newColor, setNewColor] = useState(color);

    return (
        <>
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                    </td>
                    <td>
                        <button
                            className="btn btn-default"
                            onClick={(e) => {
                                onHandleEdit(e, item.id, newName, newColor);
                                setIsEditing(false);
                            }}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="btn btn-default"
                        >
                            Cancel
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{item.name}</td>
                    <td>{item.color}</td>
                    <td>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-default"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onHandleDelete(item.id)}
                            className="btn btn-default"
                        >
                            Delete
                        </button>
                    </td>
                </>
            )}
        </>
    );
};
export default NameColorCard;
