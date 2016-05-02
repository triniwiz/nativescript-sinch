import {Observable, PropertyChangeData} from 'data/observable';
import frame = require('ui/frame');
export class CallViewModel extends Observable {
    calle: string;
    sinchClient;
    callClient;
    currentCall;
    constructor(instance: any) {
        super();
        this.set("calle", "brad");
        this.sinchClient = instance;
        this.callClient = this.sinchClient.getCallClient();
    }

    voiceCall() {
        this.currentCall = this.callClient.callUser(this.calle, { "type": "voice" });
        frame.topmost().navigate({
            moduleName: 'call/voice/voice',
            context: {
                instance: this.sinchClient,
                call: this.currentCall
            }
        });

    }
    videoCall() {
        this.currentCall = this.callClient.callUserVideo(this.calle,{ "type": "video" });
        frame.topmost().navigate({
            moduleName: 'call/video/video',
            context: {
                instance: this.sinchClient,
                call: this.currentCall
            }
        });

    }

}