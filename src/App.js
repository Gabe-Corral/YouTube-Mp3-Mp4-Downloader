import './App.css';
import { useState } from 'react'

function App() {

  const [mp3, setMp3] = useState(false);
  const [mp4, setMp4] = useState(false);
  const [url, setURL] = useState("");
  const [formatError, setFormatError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState(false);
  const [downloadMp4, setDownloadMp4] = useState(false);

  const handleClick = (e) => {
    if (e.target.value === "mp3") {
      setMp3(!mp3);
      setMp4(false);
    } else if (e.target.value === "mp4") {
      setMp4(!mp4);
      setMp3(false);
    }
  }

  const handleConvert = () => {
    if (mp3 === false && mp4 === false) {
      setFormatError(true);
    } else if (url === "") {
      setUrlError(true);
    } else if (mp3 === true){
      convertMp3();
    } else if (mp4 === true) {
      convertMp4();
    }
  }

  const convertMp3 = () => {
    fetch(`https://youtube-to-mp32.p.rapidapi.com/yt_to_mp3?video_id=${url}`, {
      "method": "GET",
    	"headers": {
    		"x-rapidapi-key": "API-Key",
    		"x-rapidapi-host": "youtube-to-mp32.p.rapidapi.com",
    	}
    })
    .then(res => res.json())
    .then(res => setDownloadInfo(res))
  }

  const convertMp4 = () => {
    fetch("https://youtube-video-grabber.p.rapidapi.com/ytGrab_v1", {
    	"method": "POST",
    	"headers": {
    		"content-type": "application/x-www-form-urlencoded",
    		"x-rapidapi-key": "API-Key",
    		"x-rapidapi-host": "youtube-video-grabber.p.rapidapi.com"
    	},
    	"body": {
    		"url_": `https://www.youtube.com/watch?v=${url}`
    	}
    })
    .then(res => res.json())
    .then(res => setDownloadMp4(res))
  }

  const handleURL = (e) => {
    let videoId = e.target.value.split("=")[1];
    setURL(videoId);
  }

  return (
    <div className="App">
      <h1>YouTube to MP3/MP4</h1>

      {mp3 === false && mp4 === false ? (
        <div>
        <button className="mp3" onClick={handleClick} value="mp3">MP3</button>
        <button className="mp4" onClick={handleClick} value="mp4">MP4</button>
        </div>
      ) : mp3 === true ? (
        <div>
        <button className="clicked-mp3" onClick={handleClick} value="mp3">MP3</button>
        <button className="mp4" onClick={handleClick} value="mp4">MP4</button>
        </div>
      ) : mp4 === true ? (
        <div>
        <button className="mp3" onClick={handleClick} value="mp3">MP3</button>
        <button className="clicked-mp4" onClick={handleClick} value="mp4">MP4</button>
        </div>
      ): ""}

      <div className="input-url">
        <input placeholder="YouTube URL" onChange={handleURL} />
        <div className="convert-button">
        <button onClick={handleConvert} >Convert</button>
        </div>
      </div>

        {formatError === true ? (
          <p>Please select mp3 or mp4.</p>
        ) : "" }

        {urlError === true ? (
          <p>Please paste a YouTube url.</p>
        ) : "" }

        {downloadInfo !== false ? (
          <div className="response">
            <h3>{downloadInfo["Title"]}</h3>
            <img alt="video_thumbnail" src={downloadInfo["Video_Thumbnail"]} />
            <div className="download-button">
            <a href={downloadInfo["Download_url"]}>Download</a>
            </div>
          </div>
        ) : ""}

        {downloadMp4 !== false ? (
          <div className="response">
            <h3>{downloadMp4['name']}</h3>
            <img alt="video_thumbnail" src={downloadMp4["thumbnail"]} />
            <div className="download-button">
            <a href={downloadMp4['cdns'][0]['url']}>Download</a>
            </div>
          </div>
        ) : ""}

    </div>
  );
}

export default App;
