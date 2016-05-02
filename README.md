#NativeScript-Sinch
##WIP

##Install
**Note** : If the android platform is not added before installing this plugin the installation will fail.

```js
tns platform add android 
tns plugin add nativescript-sinch
```


```js
var sinch = require('nativescript-sinch');

//or

import {Sinch} from 'nativescript-sinch';
```
Initialize 
```js
var sinchClient = new sinch.Sinch("appKey", "appSecret", "host", "username");

//or

let sinchClient  = new Sinch("appKey", "appSecret", "host", "username");
```

Specify the client capabilities

```js
 sinchClient.setSupportMessaging(true);
 sinchClient.setSupportCalling(true);
 sinchClient.setSupportActiveConnectionInBackground(true);
 sinchClient.setSupportPushNotifications(true);
```

Start the client
 ```js
 sinchClient.start();
```

Stop listening for incoming events (calls or messages).
 ```js
 sinchClient.stopListeningOnActiveConnection();
```
Stop the client when the calling or messaging functionality is no longer needed.
 ```js
 sinchClient.stop();
 ```
 
 Get CallClient 
 
 ```js
 sinchClient.getCallClient();
 ```
 e.g
 ```js
var callClient = sinchClient.getCallClient();
callClient.callUser("triniwiz");
 ```
 Methods
 
 ```js
addCallClientListener(callClientListener:()=>void)
callConference(conferenceId:string)
callConference(conferenceId,headers:string[])
callPhoneNumber(phoneNumber:string)
callPhoneNumber(phoneNumber:string,headers:string[])
callSip(sipIdentity:string)
callSip(sipIdentity:string,headers:string[])
callUser(toUserId:string)
callUser(toUserId:string,headers:string[])
callUserVideo(toUserId:string)
callUserVideo(toUserId:string,headers:string[])
getCall(callId:string)
removeCallClientListener(callClientListener:()=>void)
setRespectNativeCalls(respectNativeCalls:boolean)
 ```
 
 Get MessageClient
 
 ```js
 sinchClient.getMessageClient();
 ```
 
  e.g
 ```js
var messageClient = sinchClient.getCallClient();
 ```
 Methods
 
 ```
 var message = sinchClient.writableMessage();
 var message = sinchClient.writableMessage(["triniwiz","brad","jen","peter"],"Hi");
 var message = sinchClient.writableMessage("triniwiz","Sup");
 messageClient.send(message);
 ```
 
 ```js
addMessageClientListener(callback:()=>void);
removeMessageClientListener(callback:()=>void);
send(message:WriteableMessage);
```

Get VideoController

```js
 sinchClient.getVideoController()
  
```

e.g
```js
var videoController = sinchClient.getVideoController();
videoController.getCaptureDevicePosition() 
videoController.getLocalView() 
videoController.getRemoteView() 
videoController.setBorderColor(float r, float g, float b)
videoController.setCaptureDevicePosition(int facing)
videoController.setResizeBehaviour(VideoScalingType type)
videoController.toggleCaptureDevicePosition() 

```

Get AudioController

```js
  sinchClient.getAudioController()
```

e.g

```js
var audioController = sinchClient.getAudioController();

audioController.mute();
audioController.unmute();
audioController.enableSpeaker();
audioController.disableSpeaker();
```