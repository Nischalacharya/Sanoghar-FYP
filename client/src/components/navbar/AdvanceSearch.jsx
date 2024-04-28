import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getVerifiedHostel } from "../../function/Hostel";

function AdvanceSearch({ setIsAdvSearch }) {
    const [selectedOption, setSelectedOption] = useState("null");
    const [hostels, setHostels] = useState([]);

    const sexOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Both", label: "Both" },
    ];

    const fetchHostels = async () => {
        const res = await getVerifiedHostel();
        setHostels(res);
    };

    useEffect(() => {
        fetchHostels();
    }, []);

    return (
        <div className="container">
            <h1>Advanced Search</h1>
            <div
                className="adv-search-close"
                onClick={() => setIsAdvSearch(false)}
            >
                x
            </div>
            <div className="adv-search-head">
                <div>
                    <input type="text" placeholder="Search" />
                </div>
                <div>
                    <Select options={sexOptions} onChange={setSelectedOption} />
                </div>
            </div>
        </div>
    );
}

export default AdvanceSearch;
