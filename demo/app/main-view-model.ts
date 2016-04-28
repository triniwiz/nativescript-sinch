import {Observable} from 'data/observable';
import {Sinch} from './nativescript-sinch/sinch';
import app = require('application');
import platform = require("platform");
export class HelloWorldModel extends Observable {
  sinch;
  constructor() {
    super();
    let sinchClient = new Sinch("appKey", "appSecret", "host", "userId")




    // Specify the client capabilities. 
    // At least one of the messaging or calling capabilities should be enabled.
    sinchClient.setSupportMessaging(true);
    sinchClient.setSupportCalling(true);
    // sinchClient.setSupportManagedPush(true);
    // or
    sinchClient.setSupportActiveConnectionInBackground(true);
    sinchClient.startListeningOnActiveConnection();


    sinchClient.addSinchClientListener(function (cb) {


      console.dump(cb)
      switch (cb.event) {
        case 'started':
          var cc = sinchClient.getCallClient();
          cc.callUser("wiz",{first:'Osei',last:'Fortune'});
          break;
      }
      /*new com.sinch.android.rtc.SinchClientListener({
       onClientStarted: function (client) {
        console.dump(client)
       },
       onClientStopped: function (client) {
       //  console.dump(client)
       },
       onClientFailed: function (client, error) {
       //  console.dump(client)
        // console.log(error)
       },
       onRegistrationCredentialsRequired: function (client, registrationCallback) {
      //   console.dump(client)
       },
       onLogMessage: function (level, area, message) {
         console.log(message)
       }
     })*/


    })
    sinchClient.start();


  }
}