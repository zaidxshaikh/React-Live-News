import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    props.setProgress(30);

    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Monkey News`;

    updateNews();
  }, []);

  // handelPervclick = async () => {
  //   console.log("Pervious");
  //   setPage(page - 1);
  //   updateNews();
  // };

  // handelNextclick = async () => {
  //   console.log("Next");
  //   setPage(page + 1);

  //   updateNews();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };
  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px", marginTop: "90px" }}>
        News - Top {capitalizeFirstLetter(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((Element) => {
              return (
                <div className="col-md-4" key={Element.url}>
                  <NewsItem
                    title={Element.title}
                    description={Element.description}
                    imageUrl={Element.urlToImage}
                    date={Element.publishedAt}
                    Url={Element.url}
                    author={Element.author}
                    source={Element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-around">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handelPervclick}
          >
            &larr; Pervious
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handelNextclick}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};

export default News;
