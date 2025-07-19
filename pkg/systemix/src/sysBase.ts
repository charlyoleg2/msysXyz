// sysBase.ts of systemix
// the library for supporting calculation of system parameters

import type {
	tParamDef,
	tParamVal,
	//tSubInst,
	//tSubDesign,
	tPageDef
} from 'geometrix';
//import type { SysBlob } from './sysBlob';

type tMetrics = Record<string, number>;

type tVec3 = [number, number, number];
//interface tAppliedParam {
//	val: number;
//	init: number;
//	chg: boolean;
//}
//type tSubParams = Record<string, tAppliedParam>;
//type tParamVal = Record<string, number>;
interface tSubComp {
	component?: tComponentDef;
	pa: tParamVal;
	orientation: tVec3;
	position: tVec3;
}
type tSubRecord = Record<string, tSubComp>;

interface tCompIn {
	instName: string;
	pa: tParamVal;
	suffix?: string;
}
interface tParametrix {
	url: string;
	partName: string;
	objectName: string;
	objectDef?: tPageDef;
	pxJson: tParamVal;
}
interface tCompOut {
	partName: string;
	instName: string;
	calcErr: boolean;
	logstr: string;
	pa: tParamVal;
	metrics: tMetrics;
	parametrix?: tParametrix;
	sub: tSubRecord;
}
type tCompCompFunc = (compIn: tCompIn) => tCompOut;
type tSubORecord = Record<string, tCompOut>;

interface tComponentDef {
	compName: string;
	compDescription: string;
	compParams: tParamDef;
	compCompute: tCompCompFunc;
}

export type {
	tParamDef,
	tParamVal,
	tVec3,
	tMetrics,
	tSubComp,
	tSubRecord,
	tSubORecord,
	tParametrix,
	tCompIn,
	tCompOut,
	tCompCompFunc,
	tComponentDef
};
export { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'geometrix';
