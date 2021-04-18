import {JetView} from "webix-jet";
import FormView from "views/contactsForm";

export default class PopupView extends JetView {
	config(){
		return { 
			view: "window",
			position: "center",
			move: true,
			close:true,
			head: "Add new contact",
			body: FormView
		};
	}
	init(){
		this.on(this.app, "onDataEditStop", ()=>{
			this.getRoot().getBody().clear();
			this.getRoot().hide();
		});
	}
	showWindow() {
		this.getRoot().show();
	}
	hideWindow() {
		this.getRoot().hide();
	}
}