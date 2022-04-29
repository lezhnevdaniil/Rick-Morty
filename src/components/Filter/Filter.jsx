import React from "react";
import { filterList, list } from "./FilterParams";
import "./Filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter({ changeFilter }) {
  const [optionParam] = useSearchParams();
  return (
    <form>
      <div className="filter">
        {list.map((typeDetails) => (
          <div key={typeDetails}>
            <label>{typeDetails}</label>
            <select
              name={typeDetails}
              onChange={(e) => changeFilter(typeDetails, e.target.value)}
              value={optionParam.get(typeDetails)}
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
