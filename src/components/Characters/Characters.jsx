import React from "react";
import "./Characters.scss";
import loadGif from "../../picture/loading-2.gif";

function Characters({
  loading,
  error,
  data,
  setActiveInformation,
  setCharacter,
}) {
  if (error)
    return (
      <div className="error">
        <p>There were no characters found for the selected parameters</p>
      </div>
    );
  if (loading)
    return (
      <div className="loading">
        <img src={loadGif} alt="ups"></img>
      </div>
    );
  if (data)
    return (
      <>
        <div className="main">
          {data.characters.results.map(
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
              <div
                key={id}
                className="information"
                onClick={() => {
                  setActiveInformation(true);
                  setCharacter({
                    name,
                    status,
                    species,
                    gender,
                    type,
                    image,
                    location,
                    episode,
                  });
                }}
              >
                <div className="pageContainer">
                  <img className="page" src={image} alt="ups"></img>
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
                    <span>
                      Episode:{episode.map((element) => element.name)}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </>
    );
}

export default Characters;
