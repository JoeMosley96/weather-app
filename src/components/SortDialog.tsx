import React from "react";
import {SortValue} from "../types.ts";


export default function FilterDialog({setSortValues}:{setSortValues: React.Dispatch<React.SetStateAction<SortValue>>} ) {

const [selectedCategory, setSelectedCategory] = React.useState<string>("");
const [isDescending, setIsDescending] = React.useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Pass the selections back to the parent component
    setSortValues({
      sortBy: selectedCategory,
      isDescending: isDescending,
    });
    // Close the dialog after applying filters
    (document.getElementById("sortDialog") as HTMLDialogElement)?.close();
  };



  return (
    <dialog id="sortDialog" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Sort By</h3>
        <div className="modal-action border-t-2 mt-3 pt-3">
          <form className="w-full" onSubmit={handleSubmit}>
            <button
              onClick={() => {
                (
                  document.getElementById("sortDialog") as HTMLDialogElement
                )?.close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="mb-2">
              <h1>Category</h1>
              <select
                  defaultValue={"Choose category from list below"}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select w-[320px]"
              >
                <option>Most Recent Reports</option>
                <option>Severity</option>
              </select>
            </div>
              <h1>Order</h1>
            <section className="flex gap-3">
            <h1>{selectedCategory==="Severity"?"Ascending":"Old to New"}</h1>
            <input type="checkbox" defaultChecked className="toggle" onChange={()=>{setIsDescending(!isDescending)}} />
              <h1>{selectedCategory==="Severity"?"Descending":"New to Old"}</h1>
            </section>
            <div className=" pt-3 pb-0">
              <button
                type="submit"
                className="btn btn-neutral w-[50%] ml-[25%]"
              >
                Apply
              </button>

            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
