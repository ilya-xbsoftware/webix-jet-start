import {JetView, plugins} from "webix-jet";

export default class Menu extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"menu",
			localId:"top:menu",
			width:250,
			layout:"y",
			select:true,
			data:[
				{ id: "contacts", value: _("Contacts"),  icon: "wxi-drag"},
				{ id: "data", value: _("Data"), icon: "wxi-file"},
				{ id: "settings", value: _("Settings"), icon: "wxi-user"}
			]
		};
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}