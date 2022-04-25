import React from "react";
import "./Filter.scss";

function Filter() {
  return (
    <form>
      <div className="filter">
        <div>
          <label>Status</label>
          <select name="Status">
            <option>Vasya</option>
            <option>Vasyaaa</option>
            <option>Vasya111</option>
          </select>
        </div>
        <div>
          <label>Species</label>
          <select name="Species">
            <option>Vasya</option>
            <option>Vasyaaa</option>
            <option>Vasya111</option>
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select name="Gender">
            <option>Vasya</option>
            <option>Vasyaaa</option>
            <option>Vasya111</option>
          </select>
        </div>
        <div>
          <label>Type</label>
          <select name="Type">
            <option>Vasya</option>
            <option>Vasyaaa</option>
            <option>Vasya111</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default Filter;
