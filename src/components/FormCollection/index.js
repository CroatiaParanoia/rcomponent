import FormCollection from "./FormCollection";
import FormItems from "./FormItems";
import FormItem from "./FormItem";
import { provide } from "./config";

export { FormItems, FormItem };

FormCollection.provide = provide;

export default FormCollection;
