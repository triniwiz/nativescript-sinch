import common = require('./sinch.common');
import app = require("application");
import jsonHelper = require("./helpers/jsonHelper");
import hashmapHelper = require("./helpers/hashmapHelper");
import view = require("ui/core/view");

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
        let listener = new com.sinch.android.rtc.SinchClientListener({
            onClientStarted: function (client) {
                callback.apply(null, [{ event: 'started', listener: listener, client: client }]);
            },
            onClientStopped: function (client) {
                callback.apply(null, [{ event: 'stopped', listener: listener, client: client }]);
            },
            onClientFailed: function (client, error) {
                callback.apply(null, [{ event: 'failed', listener: listener, client: client, error: error.message }]);
            },
            onRegistrationCredentialsRequired: function (client, registrationCallback) {
                callback.apply(null, [{ event: 'regCredRequired', listener: listener, client: client, reg: registrationCallback }]);
            },
            onLogMessage: function (level, area, message) {
                callback.apply(null, [{ event: 'log', listener: listener, level: level, area: area, message: message.toString() }]);
            }
        });
        this.sinchClient.addSinchClientListener(listener)
    }

    removeSinchClientListener(sinchClientListener) {
        this.sinchClient.removeSinchClientListener(sinchClientListener);
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
        return new VideoController(this.sinchClient.getVideoController());
    }
    getAudioController() {
        return new AudioController(this.sinchClient.getAudioController());
    }

    writableMessage(...args: any[]) {
        return new WritableMessage(args);
    }

}
class VideoCall {
    call;
    constructor(instance) {
        this.call = instance;
    }
    addCallListener(callback) {
        let listener = new co.fitcom.nativescript_sinch.CustomCallListener({
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
                //   callback.apply(null, [{ event: 'ShouldSendPushNotification', listener: listener, call: call, pairs: pushPairs }]);
            },
            onVideoTrackAdded: function (call) {
                callback.apply(null, [{ event: 'trackAdded', call: call }]);
            }
        });

        this.call.addCallListener(listener);
    }
    answer() {
        this.call.answer();
    }
    getCallId() {
        return this.call.getCallId();
    }
    getDetails() {
        return this.call.getDetails();
    }
    getDirection() {
        return this.call.getDirection();
    }
    getHeaders() {
        return (hashmapHelper.toJsObject(this.call.getHeaders()));
    }
    getRemoteUserId() {
        return this.call.getRemoteUserId();
    }
    getState() {
        return this.call.getState();
    }
    hangup() {
        this.call.hangup();
    }
    removeCallListener(callListener) {
        this.call.removeCallListener(callListener);
    }
    sendDTMF(keys) {
        this.call.sendDTMF(keys)
    }
}
class Call {
    call;
    constructor(instance) {
        this.call = instance;
    }
    addCallListener(callback) {
        let listener = new com.sinch.android.rtc.calling.CallListener({
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
                //   callback.apply(null, [{ event: 'ShouldSendPushNotification', listener: listener, call: call, pairs: pushPairs }]);
            }
        });
        this.call.addCallListener(listener);
    }
    answer() {
        this.call.answer();
    }
    getCallId() {
        return this.call.getCallId().toString();
    }
    getDetails() {
        return this.call.getDetails();
    }
    getDirection() {
        return this.call.getDirection().toString();
    }
    getHeaders() {
        return (hashmapHelper.toJsObject(this.call.getHeaders()));
    }
    getRemoteUserId() {
        return this.call.getRemoteUserId().toString();
    }
    getState() {
        return this.call.getState().toString();
    }
    hangup() {
        this.call.hangup();
    }
    removeCallListener(callListener) {
        this.call.removeCallListener(callListener);
    }
    sendDTMF(keys) {
        this.call.sendDTMF(keys)
    }
}
class CallClient {
    callClient;
    constructor(instance) {
        this.callClient = instance;
    }
    addCallClientListener(callback: () => void) {
        let listener = new com.sinch.android.rtc.calling.CallClientListener({
            onIncomingCall: function (callClient, call) {
                callback.apply(null, [{ event: 'incomingCall', listener: listener, callClient: callClient, call: new Call(call) }]);
            }
        });
        this.callClient.addCallClientListener(listener);
    }
    callConference(conferenceId: string, headers?: Object) {
        if (headers) {
            return new Call(this.callClient.callConference(conferenceId, hashmapHelper.toHashMap(headers)));
        } else {
            return new Call(this.callClient.callConference(conferenceId));
        }

    }
    callPhoneNumber(phoneNumber: string, headers?: Object) {
        if (headers) {
            return new Call(this.callClient.callPhoneNumber(phoneNumber, hashmapHelper.toHashMap(headers)));
        } else {
            return new Call(this.callClient.callPhoneNumber(phoneNumber));
        }
    }
    callSip(sipIdentity: string, headers?: Object) {
        if (headers) {
            return new Call(this.callClient.callSip(sipIdentity, hashmapHelper.toHashMap(headers)));
        } else {
            return new Call(this.callClient.callSip(sipIdentity));
        }
    }
    callUser(toUserId: string, headers?: Object) {
        if (headers) {
            return new Call(this.callClient.callUser(toUserId, hashmapHelper.toHashMap(headers)));
        } else {
            return new Call(this.callClient.callUser(toUserId));
        }
    }
    callUserVideo(toUserId: string, headers?: Object) {
        if (headers) {
            return new VideoCall(this.callClient.callUserVideo(toUserId, hashmapHelper.toHashMap(headers)));
        } else {
            return new VideoCall(this.callClient.callUserVideo(toUserId));
        }
    }
    getCall(callId: string) {
        return this.callClient.getCall(callId);
    }
    removeCallClientListener(callClientListener) {
        this.callClient.removeCallClientListener(callClientListener);
    }
    setRespectNativeCalls(support) {
        this.callClient.setRespectNativeCalls(support);
    }
}
class MessageClient {
    messageClient;
    constructor(instance) {
        console.log(instance)
        this.messageClient = instance;
    }

    addMessageClientListener(callback) {
        let listener = new com.sinch.android.rtc.messaging.MessageClientListener({
            onIncomingMessage: function (client, message) {
                callback.apply(null, [{ event: 'incomingMessage', listener: listener, client: client, message: message }]);
            },
            onMessageDelivered: function (client, deliveryInfo) {
                callback.apply(null, [{ event: 'incomingDelivered', listener: listener, client: client, deliveryInfo: deliveryInfo }]);
            },
            onMessageFailed: function (client, message, failureInfo) {
                callback.apply(null, [{ event: 'incomingFailed', listener: listener, client: client, message: message, failureInfo: failureInfo }]);
            },
            onMessageSent: function (client, message, recipientId) {
                callback.apply(null, [{ event: 'incomingSent', listener: listener, client: client, message: message, recipientId: recipientId }]);
            },
            onShouldSendPushData: function (client, message, pushPairs) {
                this.super.onShouldSendPushData(client, message, pushPairs);
                //   callback.apply(null, [{ event: 'ShouldSendPushData', listener: listener, client: client, message: message }]);
            }
        });
        this.messageClient.addMessageClientListener(listener);
    }
    removeMessageClientListener(messageClientListener) {
        this.messageClient.removeMessageClientListener(messageClientListener);
    }
    send(message: WritableMessage) {
        this.messageClient.send(message);
    }
}
class WritableMessage {
    wm;
    list;
    constructor(...args: any[]) {
        if (Array.isArray(args[0])) {
            this.wm = new com.sinch.android.rtc.messaging.WritableMessage(jsonHelper.serialize(args[0]), args[1])
        } else if (typeof args[0] === 'string') {
            this.wm = new com.sinch.android.rtc.messaging.WritableMessage(args[0], args[1]);
        } else {
            this.wm = new com.sinch.android.rtc.messaging.WritableMessage();
        }
    }


    addHeader(key: string, value: string) {
        this.wm.addHeader(key, value)
    }
    addRecipient(userId: string) {
        this.wm.addRecipient(userId);
    }
    getHeaders() {
        return this.wm.getHeaders();
    }
    getMessageId() {
        return this.wm.getMessageId();
    }
    getRecipientIds() {
        return this.wm.getRecipientIds();
    }
    getTextBody() {
        return this.wm.getTextBody();
    }
    setTextBody(textBody: string) {
        this.wm.setTextBody(textBody);
    }



}
class AudioController {
    audioController;
    constructor(instance) {
        console.dump(instance)
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
        this.videoController.setCaptureDevicePosition(facing);
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


export class SinchView extends view.View {
    private _android: android.widget.LinearLayout;
    constructor() {
        super();
    }
    get android(): android.widget.LinearLayout {
        return this._android;
    }
    get _nativeView(): android.widget.LinearLayout {
        return this._android;
    }
    public _createUI() {
        this._android = new android.widget.LinearLayout(this._context);
    }
    public addVideoView(view) {
        this._android.addView(view);
    }
}