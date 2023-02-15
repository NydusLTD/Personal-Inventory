import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        item: "",
        quantity: "",
        price: "",
        owner: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if(!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            
            setForm(record);
        }

        fetchData();

        return;
    },[params.id, navigate]);

//These methods will update the state properties.
function updateForm(value) {
    return setForm((prev) => {
        return {...prev, ...value };
    });
}

async function onSubmit(e) {
    e.preventDefault();
    const editedItem = {
        item: form.item,
        quantity: form.quantity,
        price: form.price,
        owner: form.owner,
    };
    //This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedItem),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    navigate("/");
}
// This following section will display the form that takes input from the user to update the data.
return (
    <div>
        <h3>Update Record</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="item">Item: </label>
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
            <br />

            <div className="form-group">
                <input
                    type="submit"
                    value="Update Record"
                    className="btn btn-primary"
                />
            </div>
        </form>
    </div>
    );
}