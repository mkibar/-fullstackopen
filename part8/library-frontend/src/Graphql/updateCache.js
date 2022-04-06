// function that takes care of manipulating cache
export const updateBookCache = (cache, query, addedBook) => {
  const addIfUnique = (allBooks, addedBook) => {
    let exist = allBooks?.filter((e) => e.title === addedBook?.title);
    if (exist.length === 0) {
      return allBooks.concat(addedBook);
    }
    return allBooks;
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: addIfUnique(allBooks, addedBook),
    };
  });
};

// // function that takes care of manipulating cache
// export const updateBookCache_2 = (cache, query, addedBook) => {
//   const uniqByTitle = (a) => {
//     let seen = new Set();
//     let f = a.filter((item) => {
//       if (item) {
//         let k = item?.title;
//         return seen.has(k) ? false : seen.add(k);
//       }
//       return false;
//     });
//     console.log("f", f);
//     return f;
//   };

//   cache.updateQuery(query, ({ allBooks }) => {
//     return {
//       allBooks: uniqByTitle(allBooks.concat(addedBook)),
//     };
//   });
// };
