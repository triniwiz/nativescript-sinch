import path = require('path');
import fs = require("fs");
let file;

file = [
    [path.resolve('../../', 'platforms/android/src/main/java/co/fitcom/nativescript_sinch'), 'CustomCallListener.java'],
    [path.resolve('../../', 'platforms/android/libs/jni/x86'), 'libsinch-android-rtc.so'],
    [path.resolve('../../', 'platforms/android/libs/jni/x86_64'), 'libsinch-android-rtc.so'],
    [path.resolve('../../', 'platforms/android/libs/jni/arm64-v8a'), 'libsinch-android-rtc.so'],
    [path.resolve('../../', 'platforms/android/libs/jni/armeabi-v7a'), 'libsinch-android-rtc.so'],
    [path.resolve('../../', 'platforms/android/libs'), 'sinch-android-rtc-3.9.3.jar']
];


file.forEach(function (item, index) {
    let folder = item[0];
    let oldFile = item[1];
    fs.unlink(`${folder}/${oldFile}`, (err) => {
        if (!err) {
            if (folder.indexOf('nativescript_sinch') > -1) {
                fs.rmdir(path.resolve('../../', 'platforms/android/src/main/java/co/fitcom/nativescript_sinch'), (err) => {
                    if (!err) {
                        console.log(err);
                    }
                })
            }
        }
    })
})