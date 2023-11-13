import React from 'react'

const AudioPlayer = (props) => {
    const { url } = props
    return (
        <div>
          {url &&   <audio controls autoplay={false}>
                <source src={url} type="audio/wav" />
            </audio>}
        </div>
    )
}

export default AudioPlayer