import { contacts } from "models/contacts";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

const contactsCol = new webix.DataCollection({data: contacts});
const countriesCol  = new webix.DataCollection({data: countries});
const statusesCol  = new webix.DataCollection({data: statuses});

export {contactsCol, countriesCol, statusesCol};