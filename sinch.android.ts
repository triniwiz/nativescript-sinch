import common = require('./sinch.common');
import app = require("application");
import jsonHelper = require("./helpers/jsonHelper");


export class Sinch extends common.Sinch {
    sinchClient;
    videoClient;
    messageClient;
    constructor(appKey: string, appSecret: string, host: string, userId: string) {
        super();

        this.sinchClient = com.sinch.android.rtc.Sinch.getSinchClientBuilder().context(app.android.currentContext)
            .applicationKey(appKey)
            .applicationSecret(appSecret)
            .environmentHost(host)
            .userId(userId)
            .build();
    }

    start() {
        this.sinchClient.start();
    }
    stopListeningOnActiveConnection() {
        this.sinchClient.stopListeningOnActiveConnection();
    };
    terminate() {
        this.sinchClient.terminate();
    };

    get instance() {
        return this.sinchClient;
    }
    set instance(instance: any) {
        this.sinchClient = instance;
    }



    addSinchClientListener(callback: () => void) {
        this.sinchClient.addSinchClientListener(new com.sinch.android.rtc.SinchClientListener({
            onClientStarted: function (client) {
                callback.apply(null, [{ event: 'started', client: client }]);
            },
            onClientStopped: function (client) {
                callback.apply(null, [{ event: 'stopped', client: client }]);
            },
            onClientFailed: function (client, error) {
                callback.apply(null, [{ event: 'failed', client: client, error: error.message }]);
            },
            onRegistrationCredentialsRequired: function (client, registrationCallback) {
                callback.apply(null, [{ event: 'regCredRequired', client: client, reg: registrationCallback }]);
            },
            onLogMessage: function (level, area, message) {
                callback.apply(null, [{ event: 'log', level: level, area: area, message: message.toString() }]);
            }
        }))
    }




    setPushNotificationDisplayName(displayName: string) {
        this.sinchClient.setPushNotificationDisplayName(displayName);
    }
    setSupportActiveConnectionInBackground(supported: boolean) {
        this.sinchClient.setSupportActiveConnectionInBackground(supported);
    }
    setSupportCalling(supported: boolean) {
        this.sinchClient.setSupportCalling(supported);
    }
    setSupportManagedPush(enabled: boolean) {
        this.sinchClient.setSupportManagedPush(enabled);
    }
    setSupportMessaging(supported: boolean) {
        this.sinchClient.setSupportMessaging(supported);
    }
    setSupportPushNotifications(supported: boolean) {
        this.sinchClient.setSupportPushNotifications(supported);
    }
    startListeningOnActiveConnection() {
        this.sinchClient.startListeningOnActiveConnection();
    }

    getCallClient() {
        return new CallClient(this.sinchClient.getCallClient());
    }
    getMessageClient() {
        return new MessageClient(this.sinchClient.getMessageClient());
    }
    getVideoController() {

    }
    addCallListener(callback) {
        this.sinchClient.addCallListener(new com.sinch.android.rtc.calling.CallListener({
            onCallEnded: function (call) {
                callback.apply(null, [{ event: 'callEnded', call: call }]);
            },
            onCallEstablished: function (call) {
                callback.apply(null, [{ event: 'callEstablished', call: call }]);
            },
            onCallProgressing: function (call) {
                callback.apply(null, [{ event: 'callProgressing', call: call }]);
            },
            onShouldSendPushNotification: function (call, pushPairs) {
                callback.apply(null, [{ event: 'ShouldSendPushNotification', call: call, pairs: pushPairs }]);
            }
        }))
    }

}

class CallClient {
    callClient;
    constructor(instance) {
        this.callClient = instance;
    }
    addCallClientListener(callback: () => void) {
        this.callClient.addCallClientListener(new com.sinch.android.rtc.calling.CallClientListener({
            onIncomingCall: function (callClient, call) {
                callback.apply(null, [{ event: 'incomingCall', callClient: callClient, call: call }]);
            }
        }))
    }
    callConference(conferenceId: string, headers?: Object) {
        if (headers) {
            let hm = new java.util.HashMap();
            Object.keys(headers).forEach((item) => {
                hm.put(item, headers[item]);
            })
            this.callClient.callConference(conferenceId, hm);
        } else {
            this.callClient.callConference(conferenceId);
        }

    }
    callPhoneNumber(phoneNumber: string, headers?: Object) {
        if (headers) {
            let hm = new java.util.HashMap();
            Object.keys(headers).forEach((item) => {
                hm.put(item, headers[item]);
            })
            this.callClient.callConference(phoneNumber, hm);
        } else {
            this.callClient.callConference(phoneNumber);
        }
    }
    callSip(sipIdentity: string, headers?: Object) {
        if (headers) {
            let hm = new java.util.HashMap();
            Object.keys(headers).forEach((item) => {
                hm.put(item, headers[item]);
            })
            this.callClient.callConference(sipIdentity, hm);
        } else {
            this.callClient.callConference(sipIdentity);
        }
    }
    callUser(toUserId: string, headers?: Object) {
        if (headers) {
            let hm = new java.util.HashMap();
            Object.keys(headers).forEach((item) => {
                hm.put(item, headers[item]);
            })
            this.callClient.callConference(toUserId, hm);
        } else {
            this.callClient.callConference(toUserId);
        }
    }
    callUserVideo(toUserId: string, headers?: Object) {
        if (headers) {
            let hm = new java.util.HashMap();
            Object.keys(headers).forEach((item) => {
                hm.put(item, headers[item]);
            })
            this.callClient.callConference(toUserId, hm);
        } else {
            this.callClient.callConference(toUserId);
        }
    }
    getCall(callId: string) {
        return this.callClient.getCall(callId);
    }
    removeCallClientListener(callClientListener: () => void) {
        this.callClient.removeCallClientListener(callClientListener);
    }
    setRespectNativeCalls(support) {
        this.callClient.setRespectNativeCalls(support);
    }
}

class MessageClient {
    messageClient;
    constructor(instance) {
        this.messageClient = instance;
    }

    addMessageClientListener(callback) {

    }
    removeMessageClientListener(messageClientListener) {

    }
    send(...args: any[]) {

    }
}

class AudioController {
    audioController;
    constructor(instance) {
        this.audioController = instance;
    }

    disableSpeaker() {
        this.audioController.disableSpeaker();
    };
    enableSpeaker() {
        this.audioController.enableSpeaker();
    };
    mute() {
        this.audioController.mute();
    };
    unmute() {
        this.audioController.unmute();
    };
}

class VideoController {
    videoController;
    constructor(instance) {
        this.videoController = instance;
    }

    getCaptureDevicePosition() {
        return this.videoController.getCaptureDevicePosition();
    }
    getLocalView() {
        return this.videoController.getLocalView();
    }
    getRemoteView() {
        return this.videoController.getRemoteView();
    }
    setBorderColor(r: number, g: number, b: number) {
        this.videoController.setBorderColor(r, g, b)
    }
    setCaptureDevicePosition(facing: number) {

    }
    setResizeBehaviour(type) {
        switch (type) {
            case 'balanced':
                this.videoController.setResizeBehaviour(com.sinch.android.rtc.video.VideoScalingType.ASPECT_BALANCED)
                break;
            case 'fill':
                this.videoController.setResizeBehaviour(com.sinch.android.rtc.video.VideoScalingType.ASPECT_FILL)
                break;
            case 'fit':
                this.videoController.setResizeBehaviour(com.sinch.android.rtc.video.VideoScalingType.ASPECT_FIT)
                break;
        }
    }
    toggleCaptureDevicePosition() {
        this.videoController.toggleCaptureDevicePosition();
    }
}
