import {JetView} from "webix-jet";
import FormView from "views/contactsForm";
import { contacts } from "models/contacts";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const deleteBtn = "<span class='webix_icon wxi-close webix-denger listDeleteBtn''></span>";
		
		const addNewRowBtn = {
			view:"button",
			label:_("Add new"),
			css:"webix_primary",
			click: () => this._addUser(),
		};

		const list = {
			view: "list",
			localId: "contactList",
			template: `#Name# ${deleteBtn}`,
			select: true,
			autoheight:true,
			onClick:{
				"listDeleteBtn": (ev, id) => {
					webix.confirm({ok:_("ok"), cancel:_("cancel"), text:_("DeleteRow")}, "confirm-warning")
						.then(() => this._deleteItem(id)); 
					return false;
				}
			}
		};

		return { cols: [
			{rows:[list, addNewRowBtn]},
			{ $subview:FormView }
		]};
	}

	init() {
		this.list = this.$$("contactList");
		this.list.parse(contacts);

		this.on(this.list, "onAfterSelect", (id) =>{
			this.show(`../contacts?id=${id}`);
		});
	}

	urlChange(){
		const firstId = contacts.getFirstId();
		const id = this.getParam("id");
		

		if(id && contacts.exists(id)){
			this.list.select(id);
		}else if(firstId && this.list.exists(firstId)){
			this.list.select(firstId);
		}else{
			this.show("../contacts");
		}
	}

	_addUser(){
		const data = {
			Name: "Some Name",
			Country: "Some Country",
			Status:  "Some Status",
		};

		contacts.add(data);
		this.list.select(data.id);
	}

	_deleteItem(id){
		const selectedId = this.list.getSelectedId();
		contacts.remove(id);
		if (selectedId === id){
			this.show("../contacts");
		}	
	}
}
