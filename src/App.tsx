/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState } from 'react'
import './App.css'
import ItemVideo from './component/ItemVideo';

function App() {
  const [medias, setMedias] = useState<{url: string | undefined, name: string | undefined, thumbnail: string | undefined}[]>([])
  const [url, setUrl] = useState<string>("")

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from({length: files.length}).forEach((_, i) => {

        const videoUrl = URL.createObjectURL(files.item(i)!);
        const videoElement = document.createElement("video");

        videoElement.src = videoUrl;
        videoElement.currentTime = 1;

        videoElement.onloadeddata = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 120;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL("image/png");

            setMedias(prev => [{name: files.item(i)?.name, url: videoUrl, thumbnail: thumbnail} , ...prev])
          }
          URL.revokeObjectURL(videoUrl);
        };
      })
    }
  }

  return (
    <div className='flex gap-4 w-screen h-screen bg-blue-50 overflow-hidden'>
      <aside className='w-[80%] p-5'>
        <video className='w-full' controls autoPlay src={url}></video>
      </aside>

      <div className='flex flex-col flex-grow gap-4 p-5 h-full overflow-y-auto'>
        <input id='input-videos' type="file" accept='video/*' hidden multiple onChange={change}/>
        <label className='text-lg w-full cursor-pointer bg-white shadow-lg p-4 rounded-lg' htmlFor='input-videos'>+ Add videos</label>
        <ul className="flex flex-col gap-4">
          {
            medias?.map(media => <ItemVideo setUrl={setUrl} media={media}/>)
          }
        </ul>
      </div>
    </div>
  )
}

export default App