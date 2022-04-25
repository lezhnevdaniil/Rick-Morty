import React, { useState } from "react";
import Characters from "./components/Characters/Characters.jsx";
import { gql, useQuery } from "@apollo/client";
import Header from "./components/Header/Header.jsx";
import Filter from "./components/Filter/Filter.jsx";
import leftArrow from "./picture/leftArrow.svg";
import rightArrow from "./picture/rightArrow.svg";
import "./App.scss";

function App() {
  const [page, setPage] = useState(1);

  const GET_CHARACTERS = gql`
    query {
      characters (page: ${page}) {
        info {
          pages,
          next,
          prev,
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

  //const start = 8 * (page - 1);
  const incPage = () => {
    if (data.characters.results.length > 19) setPage(page + 1);
  };

  const decrPage = () => {
    if (page !== 1) setPage(page - 1);
  };

  const goPage = () => {
    setPage(page);
  };

  const { loading, error, data } = useQuery(GET_CHARACTERS);
  return (
    <div className="App">
      <Header />
      <Filter />
      {data && (
        <div className="pagination">
          <img src={leftArrow} onClick={decrPage} alt="ups"></img>
          {/* <p>{data.characters.info.prev}</p>
        <p>{page}</p>
        <p>{data.characters.info.next}</p>
        {page < 40 && "..."}
        {page < 41 && <p>{data.characters.info.pages}</p>}
        <p></p> */}

          {page > 1 && <p onClick={() => setPage(1)}>1</p>}
          {page > 1 && "..."}
          {page > 3 && <p onClick={() => setPage(page - 2)}>{page - 2}</p>}
          {page > 2 && <p onClick={() => setPage(page - 1)}>{page - 1}</p>}
          <div className="nowPage">
            <p>{page}</p>
          </div>
          {page < 41 && <p onClick={() => setPage(page + 1)}>{page + 1}</p>}
          {page < 40 && <p onClick={() => setPage(page + 2)}>{page + 2}</p>}
          {page < 39 && "..."}
          {page < 39 && <p onClick={() => setPage(42)}>42</p>}
          <img src={rightArrow} onClick={incPage} alt="ups"></img>
        </div>
      )}
      <div className="App-div">
        <Characters loading={loading} error={error} data={data} page={page} />
      </div>
    </div>
  );
}

export default App;
