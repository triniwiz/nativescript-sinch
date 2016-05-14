import {Observable} from 'data/observable';
import {Sinch} from 'nativescript-sinch';
import {Frame} from 'ui/frame';
const appKey = "bd9fc79e-0c8a-4317-8b74-d251d35b3402";
const appSecret = "LoJQjM1j+0S90tj7LrMguw==";
const appHost = "sandbox.sinch.com";

export class LoginViewModel extends Observable {
    username: string;
    sinchClient;
    inCall;
    constructor() {
        super();
        this.username = "";
    }
    login() {
        if (this.username) {
            this.sinchClient = new Sinch(appKey, appSecret, appHost, this.username);
            this.sinchClient.setSupportMessaging(true);
            this.sinchClient.setSupportCalling(true);
            this.sinchClient.setSupportActiveConnectionInBackground(true);
            this.sinchClient.startListeningOnActiveConnection();

            this.sinchClient.addSinchClientListener((cb) => {
                switch (cb.event) {
                    case 'started':
                        this.sinchClient.removeSinchClientListener(cb.listener);
                        new Frame().navigate({
                            'moduleName': 'home/home',
                            'context': {
                                instance: this.sinchClient
                            }
                        })
                        break;
                    case 'error':
                        break;
                }
            })
            this.sinchClient.start();
        }
    }
}