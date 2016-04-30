import exec = require('child_process');
import path = require('path');
import fs = require("fs");
let projectDir = process.cwd();
let file;
switch (process.platform) {
    case 'linux':
        file = [
            [path.resolve('./', 'platforms/android/x86'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/x86_64'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/arm64-v8a'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/armeabi-v7a'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/sinch-android-rtc-3.9.3.jar'), path.resolve('../../', 'platforms/android/libs/')]
        ];


        file.forEach(function (item, index) {
            let fileOrFolder = item[0];
            let dest = item[1];
            exec.exec(`cp -avr ${fileOrFolder} ${dest}`, function (error, stdout, stderr) {
                if (error) {
                    console.log(error)
                }
                if (index === 4) {
                    exec.exec(`rm -rf ${path.resolve('./', 'platforms/')}`)
                }
            })
        })

        break;
    case 'win32':
        file = [
            [path.resolve('./', 'platforms/android/x86'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/x86_64'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/arm64-v8a'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/armeabi-v7a'), path.resolve('../../', 'platforms/android/libs/jni')],
            [path.resolve('./', 'platforms/android/sinch-android-rtc-3.9.3.jar'), path.resolve('../../', 'platforms/android/libs/')]
        ];


        file.forEach(function (item, index) {
            let fileOrFolder = item[0];
            let dest = item[1];
            exec.exec(`xcopy ${fileOrFolder} ${dest}`, function (error, stdout, stderr) {
                if (error) {
                    console.log(error)
                }
                if (index === 4) {
                    exec.exec(`RD /S /Q ${path.resolve('./', 'platforms/')}`)
                }

            })
        })
        break;
    case 'darwin':
        break;
    case 'sunos':
        break;
    case 'freebsd':
        break;
}