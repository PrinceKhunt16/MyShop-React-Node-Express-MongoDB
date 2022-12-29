import React, { useEffect, useState } from 'react'
import "./style.css"

const ImageShow = ({ images }) => {
  const [image, setImage] = useState()

  useEffect(() => {
    if(images){
      setImage(images[0]?.url)
    }
  }, [images])

  return (
    <div className='imageWrapper'>
      <div className='smallImagesWrapper'>
        {images &&
          images?.map((item, index) => (
            <div className='smallImages'>
              <img
                onClick={() => setImage(item.url)}
                key={item.url}
                src={item.url}
                alt={`${index}`}
              />
            </div>
          )
          )}
      </div>
      {image &&
        <div className='bigImagesWrapper'>
          <img src={image} alt="" />
        </div>
      }
    </div>
  )
}

export default ImageShow