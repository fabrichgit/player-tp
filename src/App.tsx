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

        // setMedias(prev => [{name: files.item(i)?.name, url: videoUrl} , ...prev])

        videoElement.onloadeddata = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 200; // Largeur du thumbnail
          canvas.height = 120; // Hauteur du thumbnail

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL("image/png");

            // previews.push({ file, thumbnail });
            // setVideos([...videos, ...previews]);

            setMedias(prev => [{name: files.item(i)?.name, url: videoUrl, thumbnail: thumbnail} , ...prev])
          }

          URL.revokeObjectURL(videoUrl); // Libérer la mémoire
        };
      })
    }
  }
console.log(medias);

  return (
    <div className='flex gap-4 w-screen h-screen bg-blue-50'>
      <aside className='w-[50%] p-5'>
        <video className='w-full' controls autoPlay src={url}></video>
      </aside>

      <div className='flex flex-col flex-grow p-5'>
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

  // return (
  //   <>
  //  <VideoThumbnail
  //     videoUrl={url}
  //     thumbnailHandler={(thumbnail: any) => console.log(thumbnail)}
  //     width={120}
  //     height={80}
  //   />

  //   <input type="file" multiple onChange={change}/>
  //   <div className="flex gap-4">
  //     {
  //       medias?.map(media => (
  //         <button onClick={() => setUrl(media.url!)}>{media.name}</button>
  //       ))
  //     }
  //   </div>
  //   {/* <ReactPlayer url={url} /> */}
  //   <video controls autoPlay src={url}></video>
  //   </>
  //   // <>
  //   //   <div>
  //   //     <a href="https://vite.dev" target="_blank">
  //   //       <img src={viteLogo} className="logo" alt="Vite logo" />
  //   //     </a>
  //   //     <a href="https://react.dev" target="_blank">
  //   //       <img src={reactLogo} className="logo react" alt="React logo" />
  //   //     </a>
  //   //   </div>
  //   //   <h1>Vite + React</h1>
  //   //   <div className="card">
  //   //     <button onClick={() => setCount((count) => count + 1)}>
  //   //       count is {count}
  //   //     </button>
  //   //     <p>
  //   //       Edit <code>src/App.tsx</code> and save to test HMR
  //   //     </p>
  //   //   </div>
  //   //   <p className="read-the-docs">
  //   //     Click on the Vite and React logos to learn more
  //   //   </p>
  //   // </>
  // )
}

export default App