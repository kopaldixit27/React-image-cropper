import React from 'react'
import { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const Cropper = () => {
  const [src,setFile]=useState(null);
  const handleFileChange=(e)=>{
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const [crop, setCrop] = useState({ aspect: 16 / 9 })
  const [image,setImage]=useState(null)
  const [result,setResult]=useState(null)

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image)
  }


  return (
    <div className='container'>
        <div className='row mt-2'>
            <div className='col-6'>
                <div className='display-6 mb-4'>Upload Image to be cropped</div>
                <input type='file' accept='image/*' onChange={handleFileChange}></input>
            </div>
            {src && (<div className='col-6'>
                <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />

                <button className='btn btn-danger' onClick={getCroppedImg}>Crop Image</button>
                </div>
            )}
            {result && (<div className='col-6'>
                <img src={result} alt='cropped image' className='img-fluid'></img>
            </div>)}
        </div>
    </div>
  )
}

export default Cropper