import {Page, NavigatedData} from 'ui/page';
import {VideoViewModel} from './video-view-model';
import frame = require("ui/frame");
let videoVM;
let page;
export function navigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    videoVM = new VideoViewModel(args.context.instance, args.context.call, page.getViewById("lv"),page.getViewById("rv"));
}

export function loaded(args) {
    page.bindingContext = videoVM;
}


export function localLoaded(args) {

}


export function remoteLoaded(args) {

}


export function answer() {
    videoVM.answer();
}
export function hangup() {
    videoVM.hangup();
}

export function getCaptureDevicePosition() {
    videoVM.getCaptureDevicePosition();
}

export function getLocalView() {
    videoVM.getLocalView();
}


export function getRemoteView() {
    videoVM.getRemoteView();
}

export function setBorderColor(r, g, b) {
    videoVM.setBorderColor(r, g, b);
}

export function setCaptureDevicePosition(facing) {
    videoVM.setCaptureDevicePosition(facing);
}
export function setResizeBehaviour(type) {
    videoVM.setResizeBehaviour(type)
}
export function toggleCaptureDevicePosition() {
    videoVM.toggleCaptureDevicePosition();
}

export function enableSpeaker() {
    videoVM.enableSpeaker();
}

export function disableSpeaker() {
    videoVM.disableSpeaker();
}


export function mute() {
    videoVM.mute();
}

export function unmute() {
    videoVM.unmute();
}