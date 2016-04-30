import {Frame} from 'ui/frame';
import {Page, NavigatedData} from 'ui/page';
let instance;
let page;
let call;
export function navigatingTo(args: NavigatedData) {
    instance = args.context.instance;

    args.context.instance.getCallClient().addCallClientListener((cb) => {
        call = cb.call;
        goToVideo();
    });

}
export function loaded(args) {
    page = <Page>args.object;
}
export function goToMessage() {
    new Frame().navigate({
        moduleName: 'message/message',
        context: {
            instance: instance
        }
    });
}

export function goToVoice() {
    new Frame().navigate({
        moduleName: 'voice/voice',
        context: {
            instance: instance
        }
    });
}

export function goToVideo() {
    if (call) {
        new Frame().navigate({
            moduleName: 'video/video',
            context: {
                instance: instance,
                call: call
            }
        });
    } else {
        new Frame().navigate({
            moduleName: 'video/video',
            context: {
                instance: instance
            }
        });
    }

}