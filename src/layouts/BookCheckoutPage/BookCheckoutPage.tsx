import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { StarsReview } from "../utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { error } from "console";
import { LatestReviews } from "./LatestReviews";
import NumberUtils from "../utils/NumberUtils";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review State

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

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

    useEffect(
        () => {
            const fetchBookReviews = async () => {
                const reviewUrl: string = `http://localhost:8080/api/reviewEntities/search/findByBookId?bookId=${bookId}`;

                const responseReviews = await fetch(reviewUrl);

                if (!responseReviews.ok) {
                    throw new Error('Something went wrong!');
                }

                const responseJson = await responseReviews.json();

                const responseData = responseJson._embedded.reviewEntities;

                const loadedReviews: ReviewModel[] = [];

                let weightedStarReviews: number = 0;

                for (const key in responseData) {
                    loadedReviews.push(
                        {
                            id: responseData[key].id,
                            userEmail: responseData[key].userEmail,
                            reviewDate: responseData[key].reviewDate,
                            rating: responseData[key].rating,
                            bookId: responseData[key].bookId,
                            reviewDescription: responseData[key].reviewDescription
                        }

                    );

                    weightedStarReviews = weightedStarReviews + responseData[key].rating;
                }

                if (loadedReviews.length>0) {
                    const round : number = NumberUtils.roundedToHalfWithDecimal (weightedStarReviews / loadedReviews.length);
                    
                    setTotalStars(round);
                }

                setReviews(loadedReviews);

                setIsLoadingReview(false);
            };

            fetchBookReviews().catch(
                (error: any) => {
                    setIsLoadingReview(false);
                    setHttpError(error.message);
                }
            );
        }, []
    );

    if (isLoadingPage || isLoadingReview) {
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
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReviews bookId={book?.id} reviews={reviews} mobile={false}/>
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
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
                <LatestReviews bookId={book?.id} reviews={reviews} mobile={true}/>
            </div>
        </div>
    );
}