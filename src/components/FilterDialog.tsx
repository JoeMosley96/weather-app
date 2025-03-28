import React from "react";
import CreatableSelect from "react-select/creatable";
import { Filters } from "../types.ts";


//boilerplate code for region selection box
const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

export default function FilterDialog({
  setFilters,
    states
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  states: Record<string, string>;
}) {

  const [selectedTime, setSelectedTime] = React.useState<string | null>("Upcoming");
  const [selectedState, setSelectedState] = React.useState<string>("");
  const [regionInputValue, setRegionInputValue] = React.useState("");
  const [selectedRegions, setSelectedRegions] = React.useState<readonly Option[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Pass the selections back to the parent component
    setFilters({
      time: selectedTime,
      state: selectedState,
      regions: selectedRegions.map((option) => option.value),
    });
    // Close the dialog after applying filters
    (document.getElementById("filterDialog") as HTMLDialogElement)?.close();
  };


  return (
    <dialog id="filterDialog" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Filters</h3>
        <div className="modal-action border-t-2 mt-3 pt-3">
          <form className="w-full" onSubmit={handleSubmit}>
            <button
              onClick={() => {
                (
                  document.getElementById("filterDialog") as HTMLDialogElement
                )?.close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="mb-2">
              <h1>Time</h1>
              <input
                type="radio"
                className="radio bg-gray-100"
                id="upcoming"
                name="filter_preference"
                value="Upcoming"
                defaultChecked
                onChange={(e) => setSelectedTime(e.target.value)}
              />
              <label className="ml-2" htmlFor="upcoming">
                Upcoming
              </label>
              <input
                type="radio"
                className="radio bg-gray-100"
                id="past"
                name="filter_preference"
                value="Past"
                onChange={(e) => setSelectedTime(e.target.value)}
              />
              <label className="ml-2" htmlFor="past">
                Past
              </label>
            </div>
            <div className="mb-2">
              <h1>State</h1>
              <select
                  defaultValue={selectedState || "Choose state from list below"}
                onChange={(e) => setSelectedState(e.target.value)}
                className="select w-[320px]"
              >
                <option disabled={true}>Choose state from list below</option>
                {Object.keys(states).map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>
            <h1>Region(s)</h1>
            <CreatableSelect
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? "black" : "#d3d3d3",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: state.isFocused ? "0 0 0 2px white, 0 0 0 3px black" : "none",
                    "&:hover": {
                      borderColor: state.isFocused ? "black" : "grey",
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    marginLeft: "8px",
                    fontSize: "14px",
                  }),
                  input: (base) => ({
                    ...base,
                    marginLeft: "8px",
                  }),
                }}
              className="w-[320px]"
              components={components}
              inputValue={regionInputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue) => setSelectedRegions(newValue)}
              onInputChange={(newValue) => setRegionInputValue(newValue)}
              onKeyDown={(event) => {
                if (!regionInputValue) return;
                switch (event.key) {
                  case "Enter":
                  case "Tab":
                    setSelectedRegions((prev) => [...prev, createOption(regionInputValue)]);
                    setRegionInputValue("");
                    event.preventDefault();
                }
              }}
              placeholder="Enter specific regions (optional)"
              value={selectedRegions}
            />
            <div className="pt-3 pb-0">
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
