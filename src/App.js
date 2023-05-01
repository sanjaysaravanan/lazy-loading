import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';


const Item = React.memo(({
  name,
  imageUrl,
  index
}) => {
  return <span>
    {console.log(index + 1)}
    <img
      src={imageUrl}
      alt={name}
      style={{
        height: '250px',
        width: '250px',
        margin: '8px'
      }}
      key={imageUrl}
    />
  </span>
})

function App() {
  console.log('Hi Hello')
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const getImage = async (pageNo) => {
    const response = await fetch(`https://api.disneyapi.dev/character?page=${pageNo}&pageSize=9`);
    const { data } = await response.json();
    setImages([...images, ...data]);
  }

  useEffect(() => {
    if (!mounted) {
      getImage(pageNo);
      setMounted(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    getImage(pageNo + 1);
    setPageNo(pageNo + 1);
  }

  return (
    <div className="App">
      {console.log(images)}
      <div
        style={{
          margin: '8px'
        }}
      >
        {console.log('################ Rendering ##################')}
        {images.map(({ name, imageUrl }, index) => (
          <Item
            key={imageUrl}
            name={name}
            imageUrl={imageUrl}
            index={index}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={() => loadMore()}
      >
        <button>Load More</button>
      </div>
    </div>
  );
}

export default App;
