const arrAll = JSON.parse(localStorage.getItem('moviesFormatedAll'));
const arrShort = JSON.parse(localStorage.getItem('moviesShortFormated'));
const isShort = localStorage.getItem('ShowShortState');
const searchStr = localStorage.getItem('searchText');

export const getFoundInAll = () => {
    const srchStr = searchStr.toLowerCase();
    console.log('Ищем', srchStr);

    return arrAll.filter((movie) => {
        const whereFind = movie.nameRU.toLowerCase() + movie.nameEN.toLowerCase();
        if (whereFind.includes(srchStr)) {
            return movie
        };
    });
};

export const getFoundInShort = () => {
    const srchStr = searchStr.toLowerCase();

    return arrShort.filter((movie) => {
        const whereFind = movie.nameRU.toLowerCase() + movie.nameEN.toLowerCase();
        if (whereFind.includes(srchStr)) {
            return movie
        };
    });
};