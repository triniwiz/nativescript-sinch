import exec = require('child_process');
import path = require('path');
let projectDir = process.cwd();
let file;
console.log(projectDir)
switch (process.platform) {
    case 'linux':
        file = [
            ['platforms/android/x86', 'platforms/android/libs/jni'],
            ['platforms/android/x86_64', 'platforms/android/libs/jni'],
            ['platforms/android/arm64-v8a', 'platforms/android/libs/jni'],
            ['platforms/android/armeabi-v7a', 'platforms/android/libs/jni'],
            ['platforms/android/sinch-android-rtc-3.9.3.jar', 'platforms/android/libs']
        ];

        process.chdir(projectDir)
        file.forEach(function (item, index) {
            let fileOrFolder = item[0];
            let dest = item[1];
            exec.exec(`cp -avr ${fileOrFolder} ${dest}`, function (error, stdout, stderr) {
                if (error) {
                    console.log(error)
                }
            })
        })

        break;
    case 'win32':
        file = [
            ['platforms/android/x86', 'platforms/android/libs/jni'],
            ['platforms/android/x86_64', 'platforms/android/libs/jni'],
            ['platforms/android/arm64-v8a', 'platforms/android/libs/jni'],
            ['platforms/android/armeabi-v7a', 'platforms/android/libs/jni'],
            ['platforms/android/sinch-android-rtc-3.9.3.jar', 'platforms/android/libs']
        ];

        process.chdir(projectDir)
        file.forEach(function (item, index) {
            let fileOrFolder = item[0];
            let dest = item[1];
            exec.exec(`xcopy ${fileOrFolder} ${dest}`, function (error, stdout, stderr) {
                if (error) {
                    console.log(error)
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