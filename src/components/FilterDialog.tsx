import React from "react";
import CreatableSelect from "react-select/creatable";
import { Filters } from "../types.ts";

//Boilerplate code for CreatableSelect component
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
  states,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  states: Record<string, string>;
}) {
  const [selectedState, setSelectedState] = React.useState<string>(() => {
    //initialise selectedState as an empty string - if it is the first time loading the modal. if not, pull in the state from local storage
    const savedState = localStorage.getItem("selectedState");
    return savedState || "Choose state from list below";
  });
  const [regionInputValue, setRegionInputValue] = React.useState("");
  const [selectedRegions, setSelectedRegions] = React.useState<
    readonly Option[]
  >(() => {
    //initialise selectedRegions as an empty array - if it is the first time loading the modal. if not, pull in the regions from local storage
    const savedRegions = localStorage.getItem("selectedRegions");
    return JSON.parse(savedRegions || "[]") || [];
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Pass the selections back to the parent component
    setFilters({
      state: selectedState,
      regions: selectedRegions.map((option) => option.value),
    });
    // Close the dialog after applying filters
    (document.getElementById("filterDialog") as HTMLDialogElement)?.close();
  };

  // Pass selected state to local storage when it changes - so that settings are still visible when modal is reloaded
  React.useEffect(() => {
    localStorage.setItem("selectedState", selectedState);
  }, [selectedState]);

  // Pass selected regions to local storage when they are changed - so that settings are still visible when modal is reloaded
  React.useEffect(() => {
    localStorage.setItem("selectedRegions", JSON.stringify(selectedRegions));
  }, [selectedRegions]);

  return (
    <dialog id="filterDialog" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Filters</h3>
        <div className="modal-action border-t-2 mt-3 pt-3">
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
          <form className="w-full" onSubmit={handleSubmit}>
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
                //styles CreatableSelect to match the dropdown box
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? "black" : "#d3d3d3",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  boxShadow: state.isFocused
                    ? "0 0 0 2px white, 0 0 0 3px black"
                    : "none",
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
                    setSelectedRegions((prev) => [
                      ...prev,
                      createOption(regionInputValue),
                    ]);
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
