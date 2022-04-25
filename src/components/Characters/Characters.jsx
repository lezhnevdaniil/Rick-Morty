import React, { useState } from "react";
import loadGif from "../../picture/loading-2.gif";
import "./Characters.scss";


function Characters({ loading, error, data }) {
  const [page, setPage] = useState(1);
  const start = 8 * (page - 1);
  const incPage = () => {
    if (data.characters.results.length > page * 9) setPage(page + 1);
  };
    
  if (error)
    return (
      <div className="error">
        <p>Something went wrong</p>
      </div>
    );
  if (loading)
    return (
      <div className="loading">
        <img src={loadGif}></img>
      </div>
    );
  if (data)
    return (
      <div className="main">
        {data.characters.results.slice(start, start + 8).map(
          ({
            id,
            name,
            status,
            species,
            gender,
            type,
            image,
            location,
            episode,
          }) => (
            <div key={id} className="information">
              <div className="pageContainer">
                <img className="page" src={image}></img>
              </div>
              <div className="text">
                <p>Name:{name}</p>
                <p>Status:{status}</p>
                <p>Species:{species}</p>
                <p>Gender:{gender}</p>
                {type && <p>Type:{type}</p>}
                <p>Location:{location.name}</p>
                <div
                  className={episode.length > 38 ? "episode" : "episodeMini"}
                >
                  <span>Episode:{episode.map((element) => element.name)}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
}

export default Characters;
