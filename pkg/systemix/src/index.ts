// systemix.ts
// the library for supporting calculation of system parameters

import type {
	tParamDef,
	tParamVal,
	//tSubInst,
	//tSubDesign,
	tPageDef
} from 'geometrix';

type tMetrics = Record<string, number>;

type tVec3 = [number, number, number];
interface tAppliedParam {
	val: number;
	init: number;
	chg: boolean;
}
type tSubParams = Record<string, tAppliedParam>;
interface tSubComp {
	partName: string;
	objectDef?: tComponentDef;
	dparam: tSubParams;
	orientation: tVec3;
	position: tVec3;
}
type tSubRecord = Record<string, tSubComp>;

interface tCompIn {
	instName: string;
	simtime: number;
	ipVal: tParamVal;
	suffix?: string;
}
interface tCompOut {
	partName: string;
	instanceName: string;
	calcErr: boolean;
	logstr: string;
	metrics: tMetrics;
	parametrix: {
		url: string;
		partName: string;
		objectName: string;
		objectDef?: tPageDef;
		pxJson: tParamVal;
	};
	sub: tSubRecord;
}
type tCompCompFunc = (compIn: tCompIn) => tCompOut;

interface tComponentDef {
	compName: string;
	compDescription: string;
	compParams: tParamDef;
	compCompute: tCompCompFunc;
}

export type { tParamDef, tParamVal, tCompIn, tCompOut, tCompCompFunc, tComponentDef };
export { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'geometrix';
