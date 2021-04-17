import {JetView} from "webix-jet";

export default class Datatable extends JetView {
	constructor(app, name, data, fields) {
		super(app, name);
		this.data = data;
		this.fields = fields;
	}

	config() {
		const form = {
			view:"form",
			localId:"newUserForm",
			cols:[
				{ view:"text", localId:"inputValue"},
				{ view: "button", name:"input", value:"Add new", css: "webix_primary", autowidth:true, click:() => this._addRow()},
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
						webix.message({type:"error", text:"Row can't be empty"});
						return false;
					}
				},
			},
			onClick:{
				"deleteBtn": function (e, id) {
					webix.confirm("Delete selected row?", "confirm-warning")
						.then(() => {
							this.remove(id);
						});
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
		this.table.parse(this.data);
	}

	_addRow(){
		const input = this.input;
		const currentValue = input.getValue();
		const table = this.table;
		const tableCols = table.getColumns();
		const newObj = {[tableCols[0].id]:currentValue};

		if(currentValue){
			table.add(newObj);
			input.setValue("");
		}else{
			webix.message({type:"error", text: "Enter value"});
      
		}
	}

	_columnsRender(){
		const array = this.fields;
		const closeButton = { template: "<span class='webix_icon wxi-trash deleteBtn'></span>", css:"deleteBtn" };

		const columns = array.map((field, index, array) => {
			return {id:`${field}`, header:`${field}`, editor:"text", fillspace:index === array.length - 1};
		});

		columns.push(closeButton);
		return columns;
	}
}