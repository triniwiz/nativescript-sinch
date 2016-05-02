import {Page, NavigatedData} from 'ui/page';
import {CallViewModel} from './call-view-model';
let page;
let context;
let callVM;
export function navigatingTo(args: NavigatedData) {
        callVM = new CallViewModel(args.context.instance);
}

export function loaded(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = callVM;
}
export function videoCall() {
    callVM.videoCall();
}
export function voiceCall() {
    callVM.voiceCall();
}
