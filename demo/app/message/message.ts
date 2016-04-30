import {Page, NavigatedData} from 'ui/page';
import {MessageViewModel} from './message-view-model';
let page;
let messageVM = new MessageViewModel();
export function loaded(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = messageVM;
}

export function sendMessage() {

}