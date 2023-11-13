import React, { useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';

const VoiceRecorder = (props) => {

    const [audioRecordList, setaudioRecordList] = useState([])

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        let NewaudioRecordList = audioRecordList

        NewaudioRecordList.push(url)
        setaudioRecordList([...NewaudioRecordList])

    };

    return (
        <div >
            <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }}
                downloadOnSavePress={true}
                downloadFileExtension="mp3"
            />
            {audioRecordList && audioRecordList.length > 0 && audioRecordList?.map((audioUrl, index) => {
                return <audio key={index} controls autoplay={false}>
                    <source src={audioUrl} />
                </audio>
            })}


        </div>
    )
}

export default VoiceRecorder