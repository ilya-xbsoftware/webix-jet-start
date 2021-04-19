import {JetView} from "webix-jet";
import {countriesCol, statusesCol } from "models/collections";
import Datatable from "views/common/datatable.js";

export default class ContactsView extends JetView {
	config() {
		const countriesTable = {
			localId:"countriesTable",
			cols: [ new Datatable(this.app, "", countriesCol, ["Name"])]
		};

		const statusesTable = {
			localId:"statusesTable",
			cols: [ new Datatable(this.app, "", statusesCol, ["Name", "Icon"])]
		};

		return{
			view:"tabview", cells:[
				{ header:"Countries", body:countriesTable},
				{ header:"Statuses", body:statusesTable},
			]
		};
	}
}