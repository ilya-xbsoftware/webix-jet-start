import {JetView} from "webix-jet";

export default class Datatable extends JetView {
	constructor(app, name, data, columns) {
		super(app, name);
		this.data = data;
		this.columns = columns;
	}

	config() {
		const sortControler = {
			view:"form",
			localId:"newUserForm",
			cols:[
				{ view:"text", localId:"inputValue"},
				{ view: "button", name:"input", value:"Add new", css: "webix_primary", autowidth:true, click:() => this.addRow()},
			]
		};

		const dataTable = {
			view: "datatable",
			select:"row",
			localId: "datatable",
			editable: true,
			editaction: "dblclick",
			columns: this.columns,
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
			rows:[ sortControler, dataTable ]
		};
	}
  
	init(){
		this.table = this.$$("datatable");
		this.input = this.$$("inputValue");
		this.table.parse(this.data);
	}

	addRow(){
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
}