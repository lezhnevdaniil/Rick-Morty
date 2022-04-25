import React from "react";
import Characters from "./components/Characters/Characters.jsx";
import "./App.scss";
import { gql, useQuery } from "@apollo/client";
import Header from "./components/Header/Header.jsx";
import Filter from "./components/Filter/Filter.jsx";

function App() {
  const GET_CHARACTERS = gql`
    query {
      characters {
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
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  return (
    <div className="App">
      <Header />
      <Filter/>
      <div className="App-div">
        <Characters loading={loading} error={error} data={data} />
      </div>
    </div>
  );
}

export default App;
