import {React,useState} from 'react'
import './App.css';
import axios from "axios";
import loader from "./lgoinload.gif"
import def from "./def.png"

import { saveAs } from 'file-saver'

function ImageUpload() {

  const [selectedimage,setselectedimage]=useState(null)
  const [isselected,setisselected]=useState(false)
  const [loading, setloading] = useState(false)
  const [Width, setWidth] = useState(null)
  const [Height, setHeight] = useState(null)

  const imagehandler = (e) => {
    const file = e.target.files[0]
    setisselected(true)
    setselectedimage(file)
    const Reader = new FileReader()
    Reader.readAsDataURL(file)
    Reader.onload = () => {
      setselectedimage(Reader.result)
    }
  }
const onWidthChange = (event) => {
 if (event.target.value){
  setWidth(event.target.value);
 }
}

const onHeightChange = (event) => {
 if (event.target.value){
  setHeight(event.target.value);
 }
}
const handleResize =async (event) => {
  setloading(true);
  const res = await axios.post('http://localhost:5000',{
        width :Width,
        height:Height,
        "file": selectedimage
      })
      console.log(res)
      if (res.data.success===true) {
        setloading(false)
        setselectedimage(res.data.message)
      }
}
const downloadImage = () => {
  saveAs(selectedimage, 'image.jpg') // Put your image url here.
}
  return (
    <div>
      <nav className="nav-bar">
       <span className='header-name'>Image Resizer</span>
       <span className='header-desc'>Lets resize the image online for free</span>
      </nav>
      <div className='container'>
       <div className='part-1'>
       <input  className='inp' onChange={imagehandler } type='file' name='myfile' title= 'choose image'/>
       <div className="inp-container">
        <span>Width in pixel</span>
        <input className='inp' type='number' value={Width} onChange={onWidthChange } />
        </div>
        <div className="inp-container">
        <span>Height in pixel</span>
        <input className='inp' type='number' value={Height} onChange={onHeightChange } />
        </div>
        {loading?<div className='load-btn' ><img className='l_reg' src={loader} alt='loader' /></div> :<button className='btn' onClick={handleResize}>Resize</button>}
       </div>
       <div className='part-2'>
       {
         isselected?<img src={selectedimage} alt="No image selected"/>
         :<img src={def} alt="No image selected"/>
       }
       <button className='btn' onClick={downloadImage}>Download Image</button>
       </div>
      </div>
    </div>
  )
}

export default ImageUpload