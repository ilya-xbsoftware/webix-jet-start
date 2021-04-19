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
						.then(() => {
							this.list.remove(id);
						}); 
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
	}

	ready(){
		this.on(this.list, "onAfterSelect", (id) =>{
			this.show(`../contacts?id=${id}`);
		});

		this.on(this.list, "onAfterDelete", (deletedId) =>{
			const firstListId = this.list.getFirstId();
      
			contacts.remove(deletedId);

			if(firstListId){
				this.show(`../contacts?id=${firstListId}`);
			}else{
				this.show("../contacts");
			}
		
		});
	}

	urlChange(view, url){
		const id = url[0].params.id;
		if(id && contacts.exists(id)){
			this.list.select(id);
		}else{
			this.setParam("id", 1, true);
		}
	}

	
	_addUser(){
		contacts.add({
			Name: "Some Name",
			Country: "Some Country",
			Status:  "Some Status",
		});
	}
}
