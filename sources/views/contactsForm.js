import {JetView} from "webix-jet";
import { contacts } from "models/contacts";
import { countries } from "models/countries";
import { statuses } from "models/statuses";
import { messages } from "locales/messages";

export default class FormView extends JetView {

	config(){
		const _ = this.app.getService("locale")._;
    
		return {
			view: "form",
			localId: "contactForm",
			width:400,
			elements: [
				{view: "richselect", label: _("Country"), name: "Country", invalidMessage:_(`${messages.country}`), options:{
					template: "#Name#",
					body:{ data:countries, template:"#Name#"}}
				},
				{view: "richselect", label: _("Status"), name: "Status", invalidMessage:_(`${messages.status}`), options:{
					template: "#Name#",
					body:{ data:statuses, template:"#Name#"}}
				},
				{view: "text", label: _("Name"), name: "Name", invalidMessage:_(`${messages.name}`),},
				{view: "text", label: _("Email"), name: "Email", invalidMessage:_(`${messages.email}`),},
				{ cols:[
					{view: "button", value: _("clear"), click: () => this._clearMessage(), css: "webix_danger"},
					{},
					{view: "button", value: _("save"), click: () => this._successSave(), css: "webix_primary"},
				]}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail,
				Status: webix.rules.isNotEmpty,
				Country: webix.rules.isNotEmpty,
			}
		};
	}

	init(){
		this.form = this.$$("contactForm");
	}

	urlChange(){
		const id = this.getParam("id");
		if(contacts.getItem(id)){
			this.form.parse(contacts.getItem(id));
		}
	}

	_successSave(){
		const values = this.form.getValues();
		const valid = this.form.validate();

		if(valid){
			contacts.parse(values);
			webix.message({type:"success", text:"Form is save !"});
		}else{
			webix.message({type:"error", text:"Errors in the form !"});
		}
	}

	_clearMessage(){
		webix.confirm({	text: "Do you want to clear the form?"}).then(() => {
			this.form.clear();
			this.form.clearValidation();
		});
	}
}

