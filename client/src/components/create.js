import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        item: "",
        quantity: "",
        price: "",
        owner: "",
    });
    const navigate = useNavigate();

// These functions will update the state properties
function updateForm(value) {
    return setForm((prev) => {
        return {...prev, ...value };
    });
}

// This function will handle submission
async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a record to the database.
    const newItem = { ...form };

    await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    })
    .catch(error => {
        window.alert(error);
        return;
    });

    setForm({ item: "", quantity: "", price: "", owner: ""});
    navigate("/");
}
// This following section will display the form that takes the input from the user.
return (
    <div>
        <h3>Create New Record</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="item">Item</label>
                <input
                    type="text"
                    className="form-control"
                    id="item"
                    value={form.item}
                    onChange={(e) => updateForm({ item: e.target.value })}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity: </label>
                <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={form.quantity}
                    onChange={(e) => updateForm({quantity: e.target.value })}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price: </label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={form.price}
                    onChange={(e) => updateForm({price: e.target.value })}
                    />
            </div>
            <div classname="form-group">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ownerOptions"
                        id="ownerCaden"
                        value="Caden Hudson"
                        check={form.level === "Caden Hudson"}
                        onChange={(e) => updateForm({owner: e.target.value })}
                        />
                        <label htmlFor="ownerCaden" className="form-check-label">Caden Hudson</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ownerOptions"
                        id="ownerQuinn"
                        value="Quinn Hudson"
                        check={form.level === "Quinn Hudson"}
                        onChange={(e) => updateForm({owner: e.target.value })}
                        />
                        <label htmlFor="Quinn Hudson" className="form-check-label">Quinn Hudson</label>
                </div>
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Create record"
                    className="btn btn-primary"
                />
            </div>
        </form>
    </div>
);
}