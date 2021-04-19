import {JetView} from "webix-jet";
import { contactsCol } from "models/collections";
import PopupView from "views/windows/popup";

export default class ContactsView extends JetView {
	config() {
		const deleteBtn = "<span class='webix_icon wxi-close webix-denger listDeleteBtn''></span>";
		const addNewRowBtn = {
			view:"button",
			label:"Add new",
			css:"webix_primary",
			click: () => {
				if(!this._jetPopup){
					this._jetPopup = this.ui(PopupView);
				}
				this._jetPopup.showWindow();
			},
		};

		const list = {
			view: "list",
			localId: "contactList",
			template: `#Name# ${deleteBtn}`,
			select: true,
			autoheight:true,
			onClick:{
				"listDeleteBtn": (ev, id) => {
					webix.confirm("Delete selected row?", "confirm-warning")
						.then(() => {
							console.log(id);
							this.list.remove(id);
						}); 
				}
			}
		};

		return { cols: [
			{rows:[list, addNewRowBtn]},
			{ $subview:true }
		]};
	}

	init() {
		this.list = this.$$("contactList");
		this.list.parse(contactsCol);

	}

	ready(){
		this.on(this.list, "onAfterSelect", (id) =>{
			this.show(`../contacts/contactsForm?id=${id}`);
		});

		this.on(this.list, "onAfterDelete", (deletedId) =>{
      
			const firstListId = this.list.getFirstId();
			contactsCol.remove(deletedId);

			if(firstListId){
				this.show(`../contacts/contactsForm?id=${firstListId}`);
			}else{
				this.show("../contacts/contactsForm");
			}
		
		});
	}
  
	urlChange(view, url){
		const id = url[1].params.id;
		this.list.select(id);
	}
}
