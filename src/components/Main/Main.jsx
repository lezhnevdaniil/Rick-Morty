import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Characters from "../Characters/Characters";
import Header from "../Header/Header";
import Filter from "../Filter/Filter";
import leftArrow from "../../picture/leftArrow.svg";
import rightArrow from "../../picture/rightArrow.svg";
import Modal from "../Modal/Modal";
import "./Main.scss";

function Main() {
  const [filterObj, setFilterObj] = useState({});
  const [activeInformation, setActiveInformation] = useState(false);
  const [character, setCharacter] = useState({});

  const page = useParams().page;
  const navigate = useNavigate();
  const [sercParams, setSercParams] = useSearchParams();

  useEffect(() => {
    setSercParams(filterObj);
  }, [filterObj]);

  const changeFilter = (typeDetails, types) => {
    if (types !== "Without a filter") {
      setFilterObj((obj) => ({ ...obj, [typeDetails]: types }));
      navigate(`/main/${1}`);
    } else {
      let newFilter = JSON.parse(JSON.stringify(filterObj));
      delete newFilter[typeDetails];
      setFilterObj(newFilter);
    }
  };

  const filterGet = () => {
    if (Object.keys(filterObj).length) {
      const keys = Object.keys(filterObj);
      const filter = [];
      let str = "";
      keys.forEach((key) => {
        filter.push(`{${key} : "${filterObj[key]}"}`);
        str = str + `${key} : "${filterObj[key]}"`;
      });
      return `, filter: {${str}}`;
    } else {
      return "";
    }
  };

  const GET_CHARACTERS = gql`
    query {
        characters (page: ${page}${filterGet()}) {
        info {
          pages,
          next,   
          prev
        },
        results {
          id
          name
          status
          species
          gender
          type
          image
          location {
            name
          }
          episode {
            name
          }
        }
      }
    }
  `;

  const incPage = () => {
    if (page < data.characters.info.pages) navigate(`/main/${+page + 1}`);
  };
  const decrPage = () => {
    if (page > 1) navigate(`/main/${page - 1}`);
  };

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  return (
    <div className="App">
      <Header />
      <Filter changeFilter={changeFilter} />
      {data && (
        <div className="pagination">
          <img src={leftArrow} onClick={decrPage} alt="ups"></img>
          {page > 2 && <p onClick={() => navigate(`/main/${1}`)}>1</p>}
          {page > 3 && "..."}
          {page > 1 && (
            <p onClick={() => navigate(`/main/${data.characters.info.prev}`)}>
              {data.characters.info.prev}
            </p>
          )}
          <div className="nowPage">
            <p>{page}</p>
          </div>
          {page < data.characters.info.pages && (
            <p onClick={() => navigate(`/main/${data.characters.info.next}`)}>
              {data.characters.info.next}
            </p>
          )}
          {page < data.characters.info.pages - 2 && "..."}
          {page < data.characters.info.pages - 1 && (
            <p onClick={() => navigate(`/main/${data.characters.info.pages}`)}>
              {data.characters.info.pages}
            </p>
          )}
          <img src={rightArrow} onClick={incPage} alt="ups"></img>
        </div>
      )}
      <div className="App-div">
        <Characters
          loading={loading}
          error={error}
          data={data}
          page={page}
          setActiveInformation={setActiveInformation}
          activeInformation={activeInformation}
          setCharacter={setCharacter}
        />
      </div>
      <Modal
        activeInformation={activeInformation}
        setActiveInformation={setActiveInformation}
        character={character}
      />
    </div>
  );
}

export default Main;
