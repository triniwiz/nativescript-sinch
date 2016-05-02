import {Frame} from 'ui/frame';
import {Page, NavigatedData} from 'ui/page';
let instance;
let page;
let call;
let frame = new Frame();
export function navigatingTo(args: NavigatedData) {
    instance = args.context.instance;

    args.context.instance.getCallClient().addCallClientListener((cb) => {
        call = cb.call;

        switch (call.getHeaders().type) {
            case 'video':
                goToVideo();
                break;
            case 'voice':
                goToVoice();
                break;
        }
    });

}
export function loaded(args) {
    page = <Page>args.object;
}
export function goToMessage() {
    frame.navigate({
        moduleName: 'message/message',
        context: {
            instance: instance
        }
    });
}

export function goToCall() {
    frame.navigate({
        moduleName: 'call/call',
        context: {
            instance: instance
        }
    });
}
export function goToVoice() {
    frame.navigate({
        moduleName: 'call/voice/voice',
        context: {
            instance: instance,
            call: call
        }
    });
}

export function goToVideo() {
    if (call) {
        frame.navigate({
            moduleName: 'call/video/video',
            context: {
                instance: instance,
                call: call
            }
        });
    } 

}