import {VoiceViewModel} from './voice-view-model';
import {Page, NavigatedData} from 'ui/page';
let page;
let context;
let voiceVM = new VoiceViewModel();
export function loaded(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = voiceVM;
    context = page.bindingContext;
}

export function call(){
    
}