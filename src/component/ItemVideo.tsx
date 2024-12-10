function ItemVideo({media, setUrl}: {media: {
  url: string | undefined;
  name: string | undefined;
  thumbnail: string | undefined;
},
setUrl: React.Dispatch<React.SetStateAction<string>>
}) {

  return (
    <li onClick={() => setUrl(media.url!)} className="flex gap-3 p-3 rounded-lg font-medium cursor-pointer hover:bg-white/60">
      <img src={media.thumbnail} alt="" className="h-full"/>
      <p>{media.name}</p>
    </li>
  )
}

export default ItemVideo
