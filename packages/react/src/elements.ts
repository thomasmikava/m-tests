import { CustoComponent } from "custo";
import { CustoText } from "custo/lib/classes/texts";
import { CustoHook } from "custo/lib/classes/hook";
import { CustoData } from "custo/lib/classes/data";
// import { GeneralCustoComp, GeneralCustoText, GeneralCustoHook, GeneralCustoData } from "custo/lib/utils/prop-generics";

namespace CustoDeff {
	export type Component<T extends Record<any, any>, Ref = unknown> = CustoComponent<T, Ref>;

	export type HTMLElement<
		ExtraProps extends Record<any, any> = {}
	> = Component<React.HTMLProps<any> & ExtraProps, unknown>;
	
	export type Text = CustoText;

	export type Hook<Fn extends (...args: any[]) => any> = CustoHook<Fn>;

	export type Data<Data, HiddenArgs extends readonly any[] = []> =
		CustoData<Data, HiddenArgs>;

}
export { CustoDeff };


