export const filterGet = (searchParams) => {
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
export const getCharacters = (gql, page, searchParams) => {
  return gql`
    query {
        characters (page: ${page}${filterGet(searchParams)}) {
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
};
