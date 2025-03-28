// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function FilterButton() {

    return (
        <button
            className="btn w-24"
            onClick={() => {
                (document.getElementById("filterDialog") as HTMLDialogElement)?.showModal();
            }}
        >
            <FontAwesomeIcon icon={faFilter} />
            Filter
        </button>
    );
}