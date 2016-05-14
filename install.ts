import path = require('path');
import fs = require("fs");
let file = [
    [path.resolve('./', 'platforms/android/data/co/fitcom/nativescript_sinch/CustomCallListener.java'), path.resolve('../../', 'platforms/android/src/main/java/co/fitcom/nativescript_sinch'), 'CustomCallListener.java'],
    [path.resolve('./', 'platforms/android/data/x86/libsinch-android-rtc.so'), path.resolve('../../', 'platforms/android/libs/jni/x86'), 'libsinch-android-rtc.so'],
    [path.resolve('./', 'platforms/android/data/x86_64/libsinch-android-rtc.so'), path.resolve('../../', 'platforms/android/libs/jni/x86_64'), 'libsinch-android-rtc.so'],
    [path.resolve('./', 'platforms/android/data/arm64-v8a/libsinch-android-rtc.so'), path.resolve('../../', 'platforms/android/libs/jni/arm64-v8a'), 'libsinch-android-rtc.so'],
    [path.resolve('./', 'platforms/android/data/armeabi-v7a/libsinch-android-rtc.so'), path.resolve('../../', 'platforms/android/libs/jni/armeabi-v7a'), 'libsinch-android-rtc.so'],
    [path.resolve('./', 'platforms/android/data/sinch-android-rtc-3.9.3.jar'), path.resolve('../../', 'platforms/android/libs'), 'sinch-android-rtc-3.9.3.jar']
];


file.forEach(function (item, index) {
    let fileOrFolder = item[0];
    let dest = item[1];
    let newFile = item[2];


    fs.stat(dest, function (err, fileStat) {
        if (err) {
            if (err.code == 'ENOENT') {

                if (dest.indexOf("nativescript_sinch") > -1) {
                    let first = path.resolve('../../', 'platforms/android/src/main/java/co');
                    let second = path.resolve('../../', 'platforms/android/src/main/java/co/fitcom');
                    let third = path.resolve('../../', 'platforms/android/src/main/java/co/fitcom/nativescript_sinch');
                    fs.mkdir(first, (err) => {
                        if (!err) {
                            fs.mkdir(second, (err) => {
                                if (!err) {
                                    fs.mkdir(dest, (err) => {
                                        if (!err) {
                                            fs.rename(fileOrFolder, `${dest}/${newFile}`, (err) => {
                                                if (!err) {
                                                    fs.unlink(fileOrFolder, (err) => {
                                                        /*if (err) {
                                                            console.log(err);
                                                        }*/

                                                    });
                                                } else {
                                                    console.log(err);
                                                }
                                            })
                                        } else {
                                            console.log(err)
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
                    fs.mkdir(dest, (err) => {
                        if (!err) {
                            fs.rename(fileOrFolder, `${dest}/${newFile}`, (err) => {
                                if (!err) {
                                    fs.unlink(fileOrFolder, (err) => {
                                        /*if (err) {
                                            console.log(err);
                                        }*/

                                    });
                                } else {
                                    console.log(err);
                                }
                            })
                        }

                    });
                }
            }
        } else {
            if (fileStat.isDirectory()) {
    
                fs.rename(fileOrFolder, `${dest}/${newFile}`, (err) => {
                    if (!err) {
                        fs.unlink(fileOrFolder, (err) => {
                            /*if (err) {
                                console.log(err);
                            }*/
    
                        });
                    } else {
                        console.log(err);
                    }
                })
            }
        }
    });

      if (index === file.length - 1) {
  
          fs.rmdir(path.resolve('./', 'platforms/android/data'), (err) => {
             /* if (err) {
                  console.log(err);
              }*/
          });
  
      }

})