import React from "react";
import BookModel from "../../../models/BookModel";

export const ReturnBook:React.FC<{book:BookModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <img
                    src={require('./../../../Images/BooksImages/python-001.png')}
                    width={151} height={233} alt="python" />
                <h6 className="mt-2">{props.book.title}</h6>
                <p>{props.book.author}</p>
                <a href="#" className="btn main-color">
                    Reserve
                </a>
            </div>

        </div>
    );
}