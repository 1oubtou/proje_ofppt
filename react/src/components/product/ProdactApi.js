import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import ProdactApiReturn from './ProdactApiReturn';
import Search from './Search';



const ProdactApi = () => {
    const [searchResults, setSearchResults] = useState([]);

    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil((searchResults.length > 0 ? searchResults.length : data.length) / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios(
            `http://127.0.0.1:8000/api/products`
        );
        setData(result.data);
        };

        fetchData();
    }, []);

    const search = (value) => {
        const results = data.filter(product => product.title.toLowerCase().includes(value));
        if (results.length === 0) {
          setErrorMessage(`Product not found "${value}"`);
        } else {
          setErrorMessage(null);
        }
        setSearchResults(results);
      };

    const displayUsers = (searchResults.length > 0 ? searchResults : data)
    .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((product) => {
        return (
            <article key={product.id} className="rounded-xl bg-white p-3 hover:shadow-md border hover:scale-[1.01] duration-500">
                <ProdactApiReturn products={product} />
            </article>
        );
        });

  return (
    <div>
        <Search onChange={(e) => search(e.target.value)} />
        {errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
            <div className="mx-auto grid max-w-full grid-cols-1 gap-3 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {displayUsers}
            </div>
        )}
        <ReactPaginate className='flex justify-center items-center mt-4'
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            pageLinkClassName={'w-8 h-8 flex justify-center items-center border border-gray-300 '}
            activeClassName={'bg-[#ffbf7b] '}
            containerClassName={'bg-white'}
            breakLinkClassName='w-8 h-8 flex justify-center items-center border border-gray-300 hidden'
            nextClassName='px-2 h-8 flex justify-center items-center border border-gray-300 rounded-r-lg'
            previousLinkClassName='px-2 h-8 flex justify-center items-center border border-gray-300 rounded-l-lg'
        />
    </div>
  );
}

export default ProdactApi