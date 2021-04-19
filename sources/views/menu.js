import {JetView} from "webix-jet";

export default class Menu extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return {
			view:"menu",
			id:"top:menu",
			width:250,
			layout:"y",
			select:true,
			data:[
				{ id: "contacts", value: _("Contacts"), href: "#!/top/contacts/contactsForm?id=1" },
				{ id: "data", value: _("Data"), href: "#!/top/data" },
				{ id: "settings", value: _("Settings"), href: "#!/top/settings" }
			]
		};
	}
}