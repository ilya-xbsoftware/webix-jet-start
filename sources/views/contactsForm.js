import {JetView} from "webix-jet";
import { contactsCol, countriesCol, statusesCol } from "models/collections";

export default class FormView extends JetView {
	config(){
		return {
			view: "form",
			localId: "contactForm",
			width:400,
			elements: [
				{view: "richselect", label: "Country", name: "Country", options:{
					body:{ data:countriesCol, template:"#Name#"}}
				},
				{view: "richselect", label: "Status", name: "Status", options:{ 
					body:{ data:statusesCol, template:"#Name#"}}
				},
				{view: "text", label: "Name", name: "Name"},
				{view: "text", label: "Email", name: "Email"},
				{ cols:[
					{view: "button", value: "clear", click: () => this._clearMessage(), css: "webix_danger"},
					{},
					{view: "button", value: "save", click: () => this._successSave(), css: "webix_primary"},
				]}
			]
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
		contactsCol.parse(values);
		webix.message({type:"success", text:"Form is save !"});
	}

	_clearMessage(){
		webix.confirm({	text: "Do you want to clear the form?"}).then(() => {
			this.form.clear();
		});
	}
}

