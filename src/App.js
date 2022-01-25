
import './App.css';
import  React,{useRef,useEffect,useState}  from "react";
import Chat from './Chat';
function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices.getUserMedia(
      {
        video:
        {
          width: 1920,
          height: 1080
        }
      }).then(stream => {
        let video = videoRef.current;
        video.srcObject = stream
        video.play()
      }).catch(error => {
        console.log(error);
      })
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9)
    
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let context = photo.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    setHasPhoto(true)
  }

  useEffect(() => {
    getVideo()
  },[videoRef])
  return (
    <div className="App">
      <div className='camera'>
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>Snap</button>
      </div>
      <div className={'result' + (hasPhoto ?'hasPhoto':'')}>
        <canvas ref={photoRef}></canvas>
      </div>
      <Chat></Chat>
    </div>
  );
}

export default App;
