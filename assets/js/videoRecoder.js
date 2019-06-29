// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
const videoRecordContainer = document.getElementById("videoRecordContainer");
const videoPreview = document.getElementById("videoPreview");
const videoRecordBtn = document.getElementById("videoRecordBtn");

let streamObj;
let videoRecoder;

const getVideo = async () => {
    try {
        // getUserMedia 함수는 audio, video가 정상적으로 허용된 경우에만 정상작동,,
        // 그 이외의 경우는 에러 뿜어냄
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 1280,
                height: 720
            }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        videoRecordBtn.innerHTML = "Stop Recoding";
        streamObj = stream;
        startRecording();
    } catch (err) {
        console.error(err);
        videoRecordBtn.innerHTML = "☹️ Can't record";
    } finally {
        videoRecordBtn.removeEventListener("click", startRecording);
    }
}

const handleVideoRecordData = event => {
    const {
        data: videoFile
    } = event;
    // 마지막에 다운받도록 하기~ (*.webm)
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
};

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObj);
    videoRecorder.start(); // ms 단위로 주면 Chunk 단위로 데이터를 얻을 수 있음..!
    // Recording이 멈춰야만 dataavailable 이벤트의 호출이 일어남...
    // ByteStream이라서 다 끝나야 데이터를 얻을 수 있음
    videoRecorder.addEventListener("dataavailable", handleVideoRecordData);
    videoRecordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
    videoRecorder.stop();
    videoRecordBtn.removeEventListener("click", stopRecording);
    videoRecordBtn.addEventListener("click", getVideo);
    videoRecordBtn.innerHTML = "Start Recording";
};

function init() {
    videoRecordBtn.addEventListener("click", getVideo);
}

if (videoRecordContainer) {
    init();
}