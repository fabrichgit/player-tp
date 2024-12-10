/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState } from 'react'
import './App.css'

function App() {
  const [medias, setMedias] = useState<{url: string | undefined, name: string | undefined}[]>([])
  const [url, setUrl] = useState<string>("")

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from({length: files.length}).forEach((_, i) => {
        setMedias(prev => [{name: files.item(i)?.name, url: URL.createObjectURL(files.item(i)!)} , ...prev])
      })
    }
    
  }

  return (
    <>
    <input type="file" multiple onChange={change}/>
    <ul>
      {
        medias?.map(media => (
          <button onClick={() => setUrl(media.url!)}>{media.name}</button>
        ))
      }
    </ul>
    {/* <ReactPlayer url={url} /> */}
    <video controls autoPlay src={url}></video>
    </>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
