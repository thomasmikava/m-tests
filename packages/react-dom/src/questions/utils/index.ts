import { CustoComponent, transformToCusto } from "custo";
import { CustoComponentOptions } from "custo/lib/classes/components";
import { joinClassNames } from "m-tests-react/lib/utils/classnames";

export const cDom = {
	div: CustoComponent.create("div"),
	newDiv: function newDiv(
		defaultProps: React.HTMLProps<any> = {},
		options?: CustoComponentOptions<React.HTMLProps<any>>
	) {
		return CustoComponent.create("div", defaultProps, options);
	},
	newClassedDiv: function newClassedDiv(
		...args: Parameters<typeof joinClassNames>
	) {
		return CustoComponent.create("div", {
			className: joinClassNames(...args),
		});
	},
	newHTML: function newHTML(
		el: string,
		defaultProps: React.HTMLProps<any> = {},
		options?: CustoComponentOptions<React.HTMLProps<any>>
	) {
		return CustoComponent.create(el, defaultProps, options);
	},
	newComp: function newComp(...args: any[]) {
		return (CustoComponent.create as any)(...args);
	} as typeof CustoComponent.create,
	asComp: transformToCusto.Components,
};
