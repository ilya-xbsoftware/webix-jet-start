import {JetView} from "webix-jet";
import { contacts } from "models/contacts";

export default class ContactsView extends JetView {
	config() {
		const list = {
			view: "list",
			localId: "contactList",
			template: "Country: #Country# | Status: #Status# | Name: #Name# | Email: #Email#",
			select: true,
		};

		const form = {
			view: "form",
			localId: "contactForm",
			width:400,
			elements: [
				{view: "text", label: "Country", name: "Country"},
				{view: "text", label: "Status", name: "Status"},
				{view: "text", label: "Name", name: "Name"},
				{view: "text", label: "Email", name: "Email"},
				{ cols:[
					{view: "button", value: "clear", click: () => this._clearMessage(), css: "webix_danger"},
					{},
					{view: "button", value: "save", click: () => this._successSave(), css: "webix_primary"},
				]}
			]
		};

		return { cols: [list, form]};
	}

	init() {
		this.$$("contactList").parse(contacts);
		this.$$("contactForm").bind(this.$$("contactList"));
	}

	_successSave(){
		webix.message({type:" success", text:"Form is save !"});
	}

	_clearMessage(){
		webix.confirm({	text: "Do you want to clear the form?"}).then(() => {
			this.$$("contactForm").clear();
		});
	}
  
}
