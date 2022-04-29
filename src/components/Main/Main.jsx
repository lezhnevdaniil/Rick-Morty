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
  const [activeInformation, setActiveInformation] = useState(false);
  const [character, setCharacter] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useParams().page;
  const navigate = useNavigate();
  const [filterObj, setFilterObj] = useState(searchParams);

  useEffect(() => {
    setSearchParams(filterObj);
  }, [filterObj]);

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

  const filterGet = () => {
    if (searchParams.toString()) {
      const arr = [];
      for (const [key, value] of searchParams) {
        arr.push(`${key}:"${value}"`);
      }
      let strArr = "";
      arr.forEach((key) => {
        strArr = strArr + key;
      });
      return `, filter: {${strArr}}`;
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
  let paginationLink = window.location.href.split("main/");
  const incPage = () => {
    let newArr = paginationLink[1].split("?");
    newArr[0] = String(Number(newArr[0]) + 1);
    const res = "/main/" + newArr.join("?");
    if (page < data.characters.info.pages) navigate(res);
  };
  const decrPage = () => {
    let newArr = paginationLink[1].split("?");
    newArr[0] = String(Number(newArr[0]) - 1);
    const res = "/main/" + newArr.join("?");
    if (page > 1) navigate(res);
  };
  const goPage = (newPage) => {
    let newArr = paginationLink[1].split("?");
    newArr[0] = String(newPage);
    const res = "/main/" + newArr.join("?");
    navigate(res);
  };

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  return (
    <div className="App">
      <Header />
      <Filter changeFilter={changeFilter} />
      {data && (
        <div className="pagination">
          <img src={leftArrow} onClick={decrPage} alt="ups"></img>
          {page > 2 && <p onClick={() => goPage(1)}>1</p>}
          {page > 3 && "..."}
          {page > 1 && (
            <p onClick={() => goPage(data.characters.info.prev)}>
              {data.characters.info.prev}
            </p>
          )}
          <div className="nowPage">
            <p>{page}</p>
          </div>
          {page < data.characters.info.pages && (
            <p onClick={() => goPage(data.characters.info.next)}>
              {data.characters.info.next}
            </p>
          )}
          {page < data.characters.info.pages - 2 && "..."}
          {page < data.characters.info.pages - 1 && (
            <p onClick={() => goPage(data.characters.info.pages)}>
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
