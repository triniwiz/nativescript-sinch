import {Page, NavigatedData} from 'ui/page';
import {LoginViewModel} from './login-view-model';
import {EventData, PropertyChangeData} from 'data/observable';
import app = require("application")
let loginVm = new LoginViewModel();
let page;
let context;
export function loaded(args: NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = loginVm;
    context = page.bindingContext;
    loginVm.set("username","triniwiz");
}

export function login(args: NavigatedData) {
    context.login();
}
