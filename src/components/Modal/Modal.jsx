import React from "react";
import "./Modal.scss";

function Modal({ activeInformation, setActiveInformation, character }) {
  const { id, name, status, species, gender, type, image, location, episode } =
    character;
  return (
    <>
      {activeInformation ? (
        <div
          className={activeInformation ? "modal_active" : "modal"}
          onClick={() => setActiveInformation(false)}
        >
          <div
            className={
              activeInformation ? "modalContent_active" : "modalContent"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div
              key={id}
              className="informationModal"
              onClick={() => setActiveInformation(true)}
            >
              <div className="pageContainerModal">
                <img src={image} alt="ups"></img>
              </div>
              <div className="textModal">
                <div>
                  <p>Name:{name}</p>
                  <p>Status:{status}</p>
                  <p>Species:{species}</p>
                  <p>Gender:{gender}</p>
                  {type && <p>Type:{type}</p>}
                  <p>Location:{location.name}</p>
                  <div className="episodeModal">
                    <span>
                      Episode:{episode.map((element) => element.name)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Modal;
