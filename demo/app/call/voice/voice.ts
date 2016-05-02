import {Page, NavigatedData} from 'ui/page';
import {VoiceViewModel} from './voice-view-model';
let voiceVM;
let page;
export function navigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    voiceVM = new VoiceViewModel(args.context.instance, args.context.call);
}

export function loaded() {
    page.bindingContext = voiceVM;
}

export function enableSpeaker() {
    voiceVM.enableSpeaker();
}

export function disableSpeaker() {
    voiceVM.disableSpeaker();
}


export function mute() {
    voiceVM.mute();
}

export function answer() {
    voiceVM.answer();
}
export function hangup() {
    voiceVM.hangup();
}

export function unmute() {
    voiceVM.unmute();
}