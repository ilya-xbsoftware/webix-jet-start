import {JetView} from "webix-jet";
import { contactsCol, countriesCol, statusesCol } from "models/collections";
import { messages } from "locales/messages";

export default class FormView extends JetView {

	config(){
		return {
			view: "form",
			localId: "contactForm",
			width:400,
			elements: [
				{view: "richselect", label: "Country", name: "Country", invalidMessage:messages.country, options:{
					body:{ data:countriesCol, template:"#Name#"}}
				},
				{view: "richselect", label: "Status", name: "Status", invalidMessage:messages.status, options:{
					body:{ data:statusesCol, template:"#Name#"}}
				},
				{view: "text", label: "Name", name: "Name", invalidMessage:messages.name,},
				{view: "text", label: "Email", name: "Email", invalidMessage:messages.email,},
				{ cols:[
					{view: "button", value: "clear", click: () => this._clearMessage(), css: "webix_danger"},
					{},
					{view: "button", value: "save", click: () => this._successSave(), css: "webix_primary"},
				]}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isNotEmpty,
				Status: webix.rules.isNotEmpty,
				Country: webix.rules.isNotEmpty,
			}
		};
	}

	init(){
		this.form = this.$$("contactForm");
	}

	urlChange(){
		const id = this.getParam("id") ;
  
		this.form.parse(contactsCol.getItem(id));
	}

	_successSave(){
		const values = this.form.getValues();
		const valid = this.form.validate();

		if(valid){
			contactsCol.parse(values);
			webix.message({type:"success", text:"Form is save !"});
		}else{
			webix.message({type:"error", text:"Errors in the form !"});
			return false;
		}
	}

	_clearMessage(){
		webix.confirm({	text: "Do you want to clear the form?"}).then(() => {
			this.form.clear();
			this.form.clearValidation();
		});
	}
}

