import { CustoComponentOptions } from "custo/lib/classes/components";
import { CustoComponent } from "custo";
import { CustomizableLabels, CustoMergeFlag } from "custo/lib/flags";

export const pckgDefComponents = {
	newDivEl: function newDivEl(
		defaultProps: React.HTMLProps<any> = {},
		options?: CustoComponentOptions<React.HTMLProps<any>>
	) {
		return CustoComponent.create(
			"div",
			defaultProps,
			normalizeOptions(options)
		);
	},
	newHTMLEl: function newHTMLEl(
		el: string,
		defaultProps: React.HTMLProps<any> = {},
		options?: CustoComponentOptions<React.HTMLProps<any>>
	) {
		return CustoComponent.create(
			el,
			defaultProps,
			normalizeOptions(options)
		);
	},
	newComp: function newComp(...args: any[]) {
		return CustoComponent.create(
			args[0],
			args[1],
			normalizeOptions(args[2])
		);
	} as typeof CustoComponent.create,
};

const normalizeOptions = <R>(
	options?: CustoComponentOptions<R>
): CustoComponentOptions<R> => {
	return {
		...options,
		labels: options?.labels
			? [...options.labels, CustomizableLabels.packageDefaultValue]
			: [CustomizableLabels.packageDefaultValue],
	};
};

export const normalizeLinkingFlags = (flags: Set<CustoMergeFlag>) => {
	//
};
