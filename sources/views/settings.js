import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
		return {
			padding:30,	rows:[
				{
					view: "segmented",
					inputWidth: 400,
					height:50,
					label:"eng",
					options: [
						{ id:"en", value:"English" },
						{ id:"ru", value:"Russian"}
					]
				},
				{}
			]
		};
	}
}