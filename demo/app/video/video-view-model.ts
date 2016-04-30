import {Observable, PropertyChangeData} from 'data/observable';
export class VideoViewModel extends Observable {
    calle: string;
    sinchClient;
    callClient;
    currentCall;
    inCall;
    constructor(instance: any, call?: any) {
        super();
        this.set("calle", "brad");
        this.set("inCall", false);
        this.sinchClient = instance;
        if (call) {
            this.currentCall = call;
        } else {
            this.callClient = this.sinchClient.getCallClient();
        }

        /*        this.on(Observable.propertyChangeEvent,(data:PropertyChangeData)=>{
                    console.dump(data.value)
                })
        */
    }

    call() {
        this.currentCall = this.callClient.callUser(this.calle);
        this.currentCall.addCallListener((cb) => {
            switch (cb.event) {
                case 'callEnded':
                    this.set("inCall", false);
                    console.log('ended:' + cb.call.getDetails().getEndCause().toString())
                    break;
                case 'callEstablished':
                    this.set("inCall", true);
                    console.log('estab:' + cb.call.getDetails().getEndCause().toString())
                    break;
                case 'callProgressing':
                    console.log('processing:' + cb.call.getDetails().getEndCause().toString())
                    break;

            }

        })
    }

    hangup() {
        this.currentCall.hangup()
    }

    answer() {
        this.currentCall.answer();
    }
}