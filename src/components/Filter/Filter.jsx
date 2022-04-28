import React from "react";
import { filterList, list } from "./FilterParams";
import "./Filter.scss";

function Filter({ changeFilter }) {
  return (
    <form>
      <div className="filter">
        {list.map((typeDetails) => (
          <div key={typeDetails}>
            <label>{typeDetails}</label>
            <select
              name={typeDetails}
              onChange={(e) => changeFilter(typeDetails, e.target.value)}
            >
              <option>Without a filter</option>
              {filterList[typeDetails].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </form>
  );
}

export default Filter;
