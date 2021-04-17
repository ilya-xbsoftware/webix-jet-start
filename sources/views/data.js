import {JetView} from "webix-jet";
import {statuses} from "models/statuses";
import {countries} from "models/countries";
import Datatable from "views/common/datatable.js";

export default class ContactsView extends JetView {
	config() {
		const countriesTable = {
			localId:"countriesTable",
			cols: [ new Datatable(this.app, "", countries, ["Name"])]
		};

		const statusesTable = {
			localId:"statusesTable",
			cols: [ new Datatable(this.app, "", statuses, ["Name", "Icon"])]
		};

		return{
			view:"tabview", cells:[
				{ header:"Countries", body:countriesTable},
				{ header:"Statuses", body:statusesTable},
			]
		};
	}
}