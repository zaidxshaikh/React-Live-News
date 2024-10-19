import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, date, author, Url, source } = props;

  return (
    <div className="my-3 ">
      <div className="card">
        <span
          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
          style={{ left: "50%", zIndex: "1" }}
        >
          {source}
        </span>
        <img
          src={
            !imageUrl
              ? "https://answers-afd.microsoft.com/static/images/image-not-found.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              by {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={Url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
