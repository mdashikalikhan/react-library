import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../utils/Pagination";


export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [httpError, setHttpError] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    const [booksPerPage] = useState(5);

    const [totalElementOfBooks, setTotalElementOfBooks] = useState(0);

    const [totalPage, setTotalPage] = useState(0);

    const [search, setSearch] = useState('');

    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/bookEntities";

            let url: string = '';

            if(searchUrl===''){
                url = `${baseUrl}?page=${currentPage}&size=${booksPerPage}`;
            } else{
                url = `${baseUrl}${searchUrl}`;
            }

            console.log('url: ' + url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('API fetch error!!!');
            }

            console.log(response);

            const responseJson = await response.json();

            const responseData = responseJson._embedded.bookEntities;

            setTotalElementOfBooks(responseJson.page.totalElements);

            setTotalPage(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].image
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);

        };
        fetchBooks().catch(
            (error: any) => {
                setIsLoading(false);
                setHttpError(error.message );
                
            }
        )
        window.scroll(0, 0);
    }, [currentPage, searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (<div className="container m-5">
            <p>{httpError}</p>
        </div>);
    }

    const searchHandleChange = ()=>{
        if(search===''){
            setSearchUrl('');
        } else {
            
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
        
        }
    }



    const indexOfFirstBook: number = currentPage * booksPerPage + 1;

    let lastItem = (currentPage + 1) * booksPerPage > totalElementOfBooks ? totalElementOfBooks
        : (currentPage + 1) * booksPerPage;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>

                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search"
                                    className="form-control me-2"
                                    placeholder="Search"
                                    aria-labelledby="Search" 
                                    onChange={e=>setSearch(e.target.value)}/>
                                <button className="btn btn-outline-success"
                                    onClick={()=>searchHandleChange()}>
                                    Search
                                </button>
                            </div>

                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                    type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </button>
                                <ul className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <a href="#"
                                            className="dropdown-item">
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="dropdown-item">
                                            Front End
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="dropdown-item">
                                            Back End
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="dropdown-item">
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="dropdown-item">
                                            Devops
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                    <div className="mt-3">
                        <h5>Number of results: ({totalElementOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook} to {lastItem} of {totalElementOfBooks} items:
                    </p>
                    {
                        totalPage > 1 &&
                        <Pagination currentPage={currentPage + 1}
                            totalPage={totalPage} paginate={paginate} />
                    }
                    {
                        books.map(book => (
                            <SearchBook book={book} key={book.id} />
                        ))
                    }
                    {
                        totalPage > 1 &&
                        <Pagination currentPage={currentPage + 1}
                            totalPage={totalPage} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}