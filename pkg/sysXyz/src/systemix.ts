// systemix.ts
// the library for supporting calculation of system parameters

import type {
	tParamDef,
	tParamVal
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
interface tSubCompt {
	partName: string;
	objectDef: tComponentDef;
	dparam: tSubParams;
	orientation: tVec3;
	position: tVec3;
}
type tSubRecord = Record<string, tSubComp>;

interface tCompOut {
	partName: string;
	instanceName: string;
	calcErr: boolean;
	logstr: string;
	metrics: tMerics;
	parametrix: {
		url: string;
		partName: string;
		objectName: string;
		objectDef?: tPageDef;
		json: tParamVal;
	}
	sub: tSubRecord;
}
type tCalcCompFunc = (instName: string, t: number, ipVal: tParamVal, suffix?: string) => tCompOut;

interface tComponentDef {
	compName: string;
	compDescription: string;
	compParams: tParamDef;
	compCalc: tCalcCompFunc;
}
type tComponentRecord = Record<string, tComponentDef>;

export type { tParamDef, tParamVal, tCompOut, tCalcCompFunc, tComponentDef, tComponentRecord };
