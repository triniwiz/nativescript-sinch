import {Page, NavigatedData} from 'ui/page';
import {VideoViewModel} from './video-view-model';
let page;
let context;
let videoVM;
export function navigatingTo(args: NavigatedData) {
    if (args.context.call) {
        videoVM = new VideoViewModel(args.context.instance, args.context.call);
    } else {
        videoVM = new VideoViewModel(args.context.instance);
    }

}
export function loaded(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = videoVM;
}
export function call() {
    videoVM.call();
}

export function answer() {
    videoVM.answer();
}

export function hangup() {
    videoVM.hangup();
}