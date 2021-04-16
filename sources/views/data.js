import {JetView} from "webix-jet";
import {statuses} from "models/statuses";
import {countries} from "models/countries";
import Datatable from "views/common/datatable.js";

export default class ContactsView extends JetView {
	config() {
		const countriesTable = {
			localId:"countriesTable",
			cols: [ new Datatable(this.app, "", countries, [
				{ id:"Name", header:"Countries", fillspace: true, editor:"text" },
				{ template: "<span class='webix_icon wxi-trash deleteBtn'></span>", css:"deleteBtn" }
			])]
		};

		const statusesTable = {
			localId:"statusesTable",
			cols: [ new Datatable(this.app, "", statuses, [
				{ id:"Name", header:"Status", editor:"text"},
				{ id:"Icon", header:"Icon", fillspace: true },
				{ template: "<span class='webix_icon wxi-trash deleteBtn'></span>", css:"deleteBtn" }
			])]
		};

		return{
			view:"tabview", cells:[
				{ header:"Countries", body:countriesTable},
				{ header:"Statuses", body:statusesTable},
			]
		};
	}
}