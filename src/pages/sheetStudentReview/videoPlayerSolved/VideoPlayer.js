import React from 'react'
import ReactPlayer from 'react-player'
const VideoPlayer = (props) => {
  const {code}=props
  return (
    <div>
        <ReactPlayer
        controls={true}
        width={"100%"}
        url={`https://youtu.be/${code}`} />

    </div>
  )
}

export default VideoPlayer