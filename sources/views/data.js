import {JetView} from "webix-jet";
import { countries } from "models/countries";
import { statuses } from "models/statuses";
import Datatable from "views/common/datatable.js";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
    
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
				{ header:_("Countries"), body:countriesTable},
				{ header:_("Statuses"), body:statusesTable},
			]
		};
	}
}