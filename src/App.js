import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import "./App.css";

const Item = React.memo(({ name, imageUrl, index, addToFavorites }) => {
  return (
    <span>
      {console.log(index + 1)}
      <img
        src={imageUrl}
        alt={name}
        style={{
          height: "250px",
          width: "250px",
          margin: "8px",
        }}
        key={imageUrl}
      />
      <button onClick={addToFavorites}>Add To Favorites</button>
    </span>
  );
});

function App() {
  console.log("Hi Hello");
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const getImages = async (pageNo) => {
    const response = await fetch(
      `https://api.disneyapi.dev/character?page=${pageNo}&pageSize=10`
    );
    const { data } = await response.json();
    setImages([...images, ...data]);
  };

  useEffect(() => {
    if (!mounted) {
      getImages(pageNo);
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    getImages(pageNo + 1);
    setPageNo(pageNo + 1);
  };

  const handleAddToFavorites = useCallback(() => {}, []);

  return (
    <div className="App">
      {console.log(images)}
      <div
        style={{
          margin: "8px",
        }}
      >
        {console.log("################ Rendering ##################")}
        {images.map(({ name, imageUrl }, index) => (
          <Item
            addToFavorites={handleAddToFavorites}
            key={imageUrl}
            name={name}
            imageUrl={imageUrl}
            index={index}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => loadMore()}
      >
        <button>Load More</button>
      </div>
    </div>
  );
}

export default App;
