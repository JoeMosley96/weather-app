// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function FilterButton() {

    return (
        <button
            className="btn w-24"
            onClick={() => {
                (document.getElementById("sortDialog") as HTMLDialogElement)?.showModal();
            }}
        >
            <FontAwesomeIcon icon={faSort} />
            Sort
        </button>
    );
}