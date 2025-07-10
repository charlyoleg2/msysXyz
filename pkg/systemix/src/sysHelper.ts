// sysHelper.ts of systemix
// the library for supporting calculation of system parameters

import { tParamDef, tCompIn, tParamVal, tSubRecord, tSubORecord } from './sysBase';

function combineParams(compDef: tParamDef, ci: tCompIn): [tParamVal, string] {
	let rLog = '';
	// check default values from compDef
	const coPa: tParamVal = {};
	for (const pp of compDef.params) {
		const nName = pp.name;
		if (nName in coPa) {
			rLog += `err070: compDef param ${nName} is already used!\n`;
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
			rLog += `err081: ci-param ${kk} is not part of the component ${compDef.partName}!\n`;
		}
	}
	return [coPa, rLog];
}

function computeSubComp(instName: string, isub: tSubRecord): [tSubORecord, string] {
	const rSub: tSubORecord = {};
	let rLog = '';
	for (const kk in isub) {
		const vv = isub[kk];
		if (vv.component) {
			const instN2 = `${instName}/${kk}`;
			const ci: tCompIn = { instName: instN2, pa: vv.pa, suffix: '' };
			const co = vv.component.compCompute(ci);
			rSub[kk] = co;
			rLog += `[csc ${kk}] ${co.logstr}`;
		} else {
			rLog += `warn096: ${kk} has no assigned component!\n`;
		}
	}
	return [rSub, rLog];
}

export { combineParams, computeSubComp };
