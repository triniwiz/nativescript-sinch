import {Observable, PropertyChangeData} from 'data/observable';
import {TNSPlayer} from 'nativescript-audio';
export class VoiceViewModel extends Observable {
    sinchClient;
    currentCall;
    audioController;
    inCall;
    incomingCall;
    calle;
    callState;
    endCause;
    player;
    audioFile;
    direction;
    constructor(instance, call) {
        super();
        this.sinchClient = instance;
        this.currentCall = call;
        this.set("callState", this.currentCall.getState());
        this.set("calle", this.currentCall.getRemoteUserId());
        this.set("endCause", "");
        this.set("incomingCall", false);
        this.set("inCall", false);
        this.set("isPlaying", false);
        this.audioController = this.sinchClient.getAudioController();
        this.player = new TNSPlayer();
        this.direction = this.currentCall.getDirection();
        console.log(this.direction === 'INCOMING')
        switch (this.direction) {
            case 'INCOMING':
                this.set("incomingCall", true);
              //  this.playAudio('~/assets/audio/progress_tone.wav');
                break;
            case 'OUTGOING':
                this.set("inCall", true);
             //   this.playAudio('~/assets/audio/progress_tone.wav');
                break;
        }

        this.on(Observable.propertyChangeEvent, (arg: PropertyChangeData) => {
            console.log(arg.propertyName)
        })

        this.currentCall.addCallListener((cb) => {
            switch (cb.event) {
                case 'callEnded':
                    this.set("inCall", false);
                    this.set("incomingCall", false);
                    this.set("callState", this.currentCall.getState());
                    console.log(cb.call.getDetails().getEndCause().toString())
                    this.set("endCause", cb.call.getDetails().getEndCause().toString());
                    this.currentCall.removeCallListener(cb.listener);
                    this.currentCall = null;
                    break;
                case 'callEstablished':
                    this.set("inCall", true);
                    this.set("incomingCall", false);
                    this.set("callState", this.currentCall.getState());
                    break;
                case 'callProgressing':
                    this.set("callState", this.currentCall.getState());
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

    public playAudio(filepath: string) {
        console.log(filepath)
        try {
            var playerOptions = {
                audioFile: filepath,

                completeCallback: () => {
                    this.player.dispose().then(() => {
                        this.set("isPlaying", false);
                        console.log('DISPOSED');
                    }, (err) => {
                        console.log('ERROR disposePlayer: ' + err);
                    });
                },

                errorCallback: (err) => {

                    console.log(err);
                    this.set("isPlaying", false);
                },

                infoCallback: (info) => {
                    alert('Info callback: ' + info.msg);
                    console.log("what: " + info);
                }
            };

            this.set("isPlaying", true);

            this.player.playFromFile(playerOptions).then(() => {
                this.set("isPlaying", true);
            }, (err) => {
                console.log(err);
                this.set("isPlaying", false);
            });

        } catch (ex) {
            console.log(ex);
        }

    }

    public stopPlaying(args) {
        this.player.dispose().then(() => {
        }, (err) => {
            console.log(err);
        });
    }
}