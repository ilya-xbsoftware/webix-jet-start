import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
		return {
			padding:30,	rows:[
				{
					view: "segmented",
					localId:"toggle",
					inputWidth: 400,
					height:50,
					label:"English",
					options: [
						{ id:"en", value:"English" },
						{ id:"ru", value:"Russian"}
					],
					click: () => this.changeLabelValue()
				},
				{}
			]
		};
	}
	changeLabelValue(){
		const btn = this.$$("toggle");
		const btnId = btn.getValue();
		const options = btn.getOption(btnId);
		const btnValue = options.value;
  
		btn.define("label", `${btnValue}`);
		btn.refresh();
	}
}