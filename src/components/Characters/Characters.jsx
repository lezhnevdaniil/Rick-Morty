import React, { useState } from "react";
import "./Characters.scss";
import loadGif from "../../picture/loading-2.gif";
import Modal from "../Modal/Modal";
// import leftArrow from "../picture/leftArrow.svg";
// import rightArrow from "../../picture/rightArrow.svg";

function Characters({ loading, error, data, page }) {
  const [infoModal, setInfoModal] = useState('');
  const [modal, setModal] = useState(false)
  //const [page, setPage] = useState(1);
  //const start = 8 * (page - 1);
  // const incPage = () => {
  //   if (data.characters.results.length > page * 9) setPage(page + 1);
  // };

  // const decrPage = () => {
  //   if (page !== 1) setPage(page - 1);
  // };
  if (data) console.log(data.characters.info.pages);
  if (error)
    return (
      <div className="error">
        <p>Something went wrong</p>
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
        <div>
          {/* <div className="pagination">
        <img src={leftArrow} onClick={decrPage} alt="ups"></img>
        <p>{page}</p>
        <img src={rightArrow} onClick={incPage} alt="ups"></img>
      </div> */}
        </div>
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
              <div key={id} className="information">
                <div className="pageContainer">
                  <img className="page" src={image} alt='ups'></img>
                </div>
                <div className="text">
                  <p>Name:{name}</p>
                  <p>Status:{status}</p
                  <p>Species:{species}</p>
                  <p>Gender:{gender}</p>
                  {type && <p>Type:{type}</p>}
                  <p>Location:{location.name}</p>
                   {episode.length > 38 ? (
                    <span>Episode: Click on the icon for information</span>
                  ) : (
                    <div className="episodeMini">
                      <span>
                        Episode:{episode.map((element) => element.name)}
                      </span>
                    </div>
                  )} 

                  {/* <div
                      className={
                        episode.length > 38 ? "episode" : "episodeMini"
                      }
                    >
                      <span>
                        Episode:{episode.map((element) => element.name)}
                      </span>
                    </div> */}
                </div>
              </div>
            )
          )}
        </div>
        {/* <Modal/> */}
      </>
    );
}

export default Characters;
