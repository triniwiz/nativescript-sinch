#NativeScript-Sinch
##WIP


##Install
`tns plugin add nativescript-sinch`


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
 
 