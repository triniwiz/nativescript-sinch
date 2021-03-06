import {Observable} from 'data/observable';
import app = require("application");
export class VideoViewModel extends Observable {
    sinchClient;
    currentCall;
    videoController;
    inCall;
    incomingCall;
    calle;
    callState;
    endCause;
    localView;
    remoteView;
    audioController;
    direction;
    constructor(instance, call, localView, remoteView) {
        super();
        this.sinchClient = instance;
        this.currentCall = call;
        this.localView = localView;
        this.remoteView = remoteView;
        this.set("callState", this.currentCall.getState());
        this.set("calle", this.currentCall.getRemoteUserId());
        this.set("endCause", "");
        this.set("incomingCall", false);
        this.set("inCall", false);
        this.videoController = this.sinchClient.getVideoController();
        this.audioController = this.sinchClient.getAudioController();
        this.direction = this.currentCall.getDirection().toString();
        switch (this.direction) {
            case 'INCOMING':
                this.set("incomingCall", true);
                break;
            case 'OUTGOING':
                this.set("inCall", true);
                break;
        }


        this.currentCall.addCallListener((cb) => {
            switch (cb.event) {
                case 'callEnded':
                    console.log('end')
                    this.set("inCall", false);
                    this.set("incomingCall", false);
                    this.set("callState", this.currentCall.getState());
                    this.set("endCause", cb.call.getDetails().getEndCause().toString());
                    this.currentCall.removeCallListener(cb.listener);
                    this.currentCall = null;
                    break;
                case 'callEstablished':
                    console.log('esta');

                    if (this.get("incomingCall")) {
                        var lv = this.videoController.getLocalView();
                        this.localView.addVideoView(lv);

                        let rv = this.videoController.getRemoteView();
                        this.remoteView.addVideoView(rv);
                    } else {
                        let rv = this.videoController.getRemoteView();
                        this.remoteView.addVideoView(rv);
                    }
                    this.set("inCall", true);
                    this.set("incomingCall", false);
                    this.set("callState", this.currentCall.getState());
                    break;
                case 'callProgressing':
                    console.log('progressing')
                    this.set("callState", this.currentCall.getState());
                    break;
                case 'trackAdded':
                    var lv = this.videoController.getLocalView();
                    this.localView.addVideoView(lv);
                    break;
            }

        })
    }
    answer() {
        this.currentCall.answer();
    }
    hangup() {
        this.currentCall.hangup();
    }

    getCaptureDevicePosition() {
        this.videoController.getCaptureDevicePosition();
    }

    getLocalView() {
        this.videoController.getLocalView();
    }


    getRemoteView() {
        this.videoController.getRemoteView();
    }

    setBorderColor(r, g, b) {
        this.videoController.setBorderColor(r, g, b);
    }

    setCaptureDevicePosition(facing) {
        this.videoController.setCaptureDevicePosition(facing);
    }
    setResizeBehaviour(type) {
        this.videoController.setResizeBehaviour(type)
    }
    toggleCaptureDevicePosition() {
        this.videoController.toggleCaptureDevicePosition();
    }

    enableSpeaker() {
        this.audioController.enableSpeaker();
    }

    disableSpeaker() {
        this.audioController.disableSpeaker();
    }

    mute() {
        this.audioController.mute();
    }

    unmute() {
        this.audioController.unmute();
    }
}
