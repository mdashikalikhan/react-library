import { ReturnBook } from "./ReturnBook";
import { useState,useEffect } from "react";
import BookModel from "../../../models/BookModel";
import { error } from "console";

export const Carousel = () => {

    const[books, setBooks] = useState<BookModel[]>([]);

    const[isLoading, setIsLoading] = useState(true);

    const[httpError, setHttpError] = useState(null);

    useEffect(()=>{
        const fetchBooks = async()=>{
            const baseUrl : string = "http://localhost:8080/api/bookEntities";

            const url:string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if(!response.ok){
                throw new Error('API fetch error!!!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.bookEntities;

            const loadedBooks : BookModel[] = [];

            for(const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category:  responseData[key].category,
                    img: responseData[key].image
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);

        };
        fetchBooks().catch(
            (error:any)=>{
                setIsLoading(false);
                setHttpError(error.message);
            }
        )
    },[]);

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>
                    Find your next "Software Engineering" book.
                </h3>
            </div>
            <div className="carousel carousel-dark slide mt-5
                d-none d-lg-block" data-bs-interval="false"
                id="caroselExample">

                {/* Desktop  */}

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            <ReturnBook/>
                            <ReturnBook/>
                            <ReturnBook/>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            <ReturnBook/>
                            <ReturnBook/>
                            
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            <ReturnBook/>
                            
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button"
                    data-bs-target="#caroselExample" data-bs-slide="prev">

                    <span className="carousel-control-prev-icon"
                        aria-hidden="true">

                    </span>

                    <span className="visually-hidden">Previous</span>

                </button>

                <button className="carousel-control-next" type="button"
                    data-bs-target="#caroselExample" data-bs-slide="next">

                    <span className="carousel-control-next-icon"
                        aria-hidden="true">

                    </span>

                    <span className="visually-hidden">Next</span>

                </button>

            </div>

            {/* Mobile */}

            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center
                        align-items-center">

                    <ReturnBook/>

                </div>

            </div>

            <div className="homepage-carousel-title mt-3">
                <a className="btn btn-outline-secondary btn-lg" href="#">
                    View More
                </a>
            </div>

        </div>

    );
}