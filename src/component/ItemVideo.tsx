import VideoThumbnail from 'react-video-thumbnail';

function ItemVideo({media, setUrl}: {media: {
  url: string | undefined;
  name: string | undefined;
  thumbnail: string | undefined;
},
setUrl: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <li className="bg-black h-max">
      <img src={media.thumbnail} alt="" />
    </li>
  )
}

export default ItemVideo
