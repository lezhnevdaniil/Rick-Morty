import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterList, list } from "./FilterParams";
import "./Filter.scss";

function Filter({ setFilterObj, filterObj }) {
  const navigate = useNavigate();

  const changeFilter = (typeDetails, types) => {
    if (types !== "Without a filter") {
      setFilterObj((obj) => ({ ...obj, [typeDetails]: types }));
      navigate(`/main/1`);
    } else {
      let newFilter = JSON.parse(JSON.stringify(filterObj));
      delete newFilter[typeDetails];
      setFilterObj(newFilter);
      navigate(`/main/1`);
    }
  };
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
