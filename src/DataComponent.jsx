import React, { useEffect, useState } from "react";
import "./DataComponent.css";

function DataComponent() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const API = `http://hn.algolia.com/api/v1/search?page=${page}&query=`;

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API);
  }, [API]);

  const handlePrevClick = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < 49) {
      setPage(page + 1);
    }
  };
  const handleRemove = (id) => {
    const newData = data.hits.filter((item) => item.objectID !== id);
    setData({ ...data, hits: newData });
    onRemove();
  };

  return (
    <div className="dataComponent">
      {data.hits &&
        data.hits.map((item, ind) => (
          <div className="displayData" key={ind}>
            <div className="top">
              <h2>{item.title}</h2>
              <span className="details">
                By {item.author} | {item.num_comments} comments
              </span>
            </div>
            <div className="bottom">
              <a href={item.url}>Read More</a>
              <button onClick={() => handleRemove(item.objectID)} className="removeButton">Remove</button>
            </div>
          </div>
        ))}

      <div className="pagination">
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
        <span>Page: {page + 1}</span>
      </div>
    </div>
  );
}

export default DataComponent;
