// @ts-nocheck
import React from "react";

export const GlobalFilter = ({ filter, setFilter, type }) => {
  return (
    <div className={"filter-div"}>
      <span>
        Search {type}:{" "}
        <input
          type={"search"}
          value={filter || ""}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          data-testid={"search-filter"}
        />
      </span>
    </div>
  );
};

