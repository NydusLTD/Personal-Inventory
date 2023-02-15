import React from "react";

// Use route in order to define the different routes of my application
import { Route, Routes } from "react-router-dom";

// Import all the components I created.
import Navbar from "./components/navbar";
import RecordList from "./components/recordLists";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
}

export default App;