import {JetView} from "webix-jet";

export default class Menu extends JetView {
	config(){
		return {
			view:"menu",
			id:"top:menu",
			width:250,
			layout:"y",
			select:true,
			data:[
				{ id: "contacts", value: "Contacts", href: "#!/top/contacts" },
				{ id: "data", value: "Data", href: "#!/top/data" },
				{ id: "settings", value: "Settings", href: "#!/top/settings" }
			]
		};
	}
}