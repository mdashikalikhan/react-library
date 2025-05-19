import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarsReview } from "../utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [httpError, setHttpError] = useState(null);


    const bookId = window.location.pathname.split('/')[2];

    //console.log(bookId);

    useEffect(() => {

        const fetchBook = async () => {

            const baseUrl: string = "http://localhost:8080/api/bookEntities";

            const url: string = `${baseUrl}/${bookId}`;

            const reponse = await fetch(url);

            if (!reponse.ok) {
                throw new Error('API fetch error!!!');
            }

            const responseJson = await reponse.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.image
            };

            setBook(loadedBook);
            setIsLoadingPage(false);

        };

        fetchBook().catch(
            (error: any) => {
                setIsLoadingPage(false);
                setHttpError(error.message);
            }
        );



    }, []);

    if (isLoadingPage) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (<div className="container m-5">
            <p>{httpError}</p>
        </div>);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {
                            book?.img ?
                                <img src={book?.img} width={226} height={349} alt="Book" />
                                :
                                <img src={require('../../Images/BooksImages/new-book-1.png')}
                                    width={226} height={349} alt="Book" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={.5} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {
                        book?.img ?
                            <img src={book?.img} width={226} height={349} alt="Book" />
                            :
                            <img src={require('../../Images/BooksImages/new-book-1.png')}
                                width={226} height={349} alt="Book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={.5} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true}/>
                <hr/>
            </div>
        </div>
    );
}