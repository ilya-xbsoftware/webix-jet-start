import {JetView} from "webix-jet";

export default class Datatable extends JetView {
	constructor(app, name, data, fields) {
		super(app, name);
		this.data = data;
		this.fields = fields;
	}

	config() {
		const _ = this.app.getService("locale")._;
    
		const form = {
			view:"form",
			localId:"newUserForm",
			cols:[
				{ view:"text", localId:"inputValue"},
				{ view: "button", name:"input", value:_("Add new"), css: "webix_primary", autowidth:true, click:() => this._addRow()},
			]
		};

		const dataTable = {
			view: "datatable",
			select:"row",
			localId: "datatable",
			editable: true,
			editaction: "dblclick",
			columns: this._columnsRender(),
			on:{
				onBeforeEditStop(values, editor){
					const title = editor.getValue();
					if(!title){
						webix.message({type:"error", text:_("clearRow")});
						return false;
					}
				},
			},
			onClick:{
				"deleteBtn": (e, id) => {
					webix.confirm({ok:_("ok"), cancel:_("cancel"), text:_("DeleteRow")}, "confirm-warning")
						.then(() => this._deleteRow(id));
					return false;
				}
			},
		};

		return {
			rows:[ form, dataTable ]
		};
	}
  
	init(){
		this.table = this.$$("datatable");
		this.input = this.$$("inputValue");
		this.table.sync(this.data);
	}

	_addRow(){
		const _ = this.app.getService("locale")._;
		const inputValue = this.input.getValue();

		if(inputValue){
			this.data.waitSave(() => {
				this.data.add({Name:inputValue});
				this.input.setValue("");
			});
		}else{
			webix.message({type:"error", text: _("Enter value")});
		}
	}

	_deleteRow(id){
		if(id){
			this.data.remove(id);
		}
	}

	_columnsRender(){
		const _ = this.app.getService("locale")._;
		const array = this.fields;
		const closeButton = { template: "<span class='webix_icon wxi-trash deleteBtn'></span>", css:"deleteBtn" };

		const columns = array.map((field, index, array) => {
			const headerText = _(`${field}`); 
			return {id:`${field}`, header:`${headerText}`, editor:"text", fillspace:index === array.length - 1};
		});

		columns.push(closeButton);
		return columns;
	}
}