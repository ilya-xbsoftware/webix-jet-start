import { JetView, plugins } from "webix-jet";
import Menu from "views/menu";

export default class TopView extends JetView{
	config(){
		return {
			type: "space", cols: [
				Menu,
				{ $subview: true }
			]
		};
	}
}