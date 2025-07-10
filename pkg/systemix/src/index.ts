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
	tSubRecord,
	tSubORecord,
	tCompIn,
	tCompOut,
	tCompCompFunc,
	tComponentDef
};
export { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'geometrix';

function combineParams(compDef: tParamDef, ci: tCompIn): tParamVal {
	// check default values from compDef
	const coPa: tParamVal = {};
	for (const pp of compDef.params) {
		const nName = pp.name;
		if (nName in coPa) {
			console.log(`err070: compDef param ${nName} is already used`);
		} else {
			coPa[nName] = pp.init;
		}
	}
	// check and apply ci-params
	for (const kk in ci.pa) {
		//console.log(`dbg085: kk ${kk}`);
		//console.log(`dbg086: coPa keys: ${Object.keys(coPa)}`);
		if (kk in coPa) {
			coPa[kk] = ci.pa[kk];
		} else {
			console.log(`err081: ci-param ${kk} is not part of the component ${compDef.partName}`);
		}
	}
	return coPa;
}

function computeSubComp(isub: tSubRecord): tSubORecord {
	const rSub: tSubORecord = {};
	for (const kk in isub) {
		const vv = isub[kk];
		if (vv.component) {
			const ci: tCompIn = { instName: kk, pa: vv.pa, suffix: '' };
			rSub[kk] = vv.component.compCompute(ci);
		} else {
			console.log(`warn096: ${kk} has no assigned component!`);
		}
	}
	return rSub;
}

export { combineParams, computeSubComp };
