// sysHelper.ts of systemix
// the library for supporting calculation of system parameters

import type { tParamDef, tCompIn, tCompOut, tParamVal, tSubRecord, tSubORecord } from './sysBase';
import { sBlob } from './sysBlob';

function combineParams(compDef: tParamDef, ci: tCompIn): [tParamVal, string, boolean] {
	let rLog = '';
	let rErr = false;
	// check default values from compDef
	const coPa: tParamVal = {};
	for (const pp of compDef.params) {
		const nName = pp.name;
		if (nName in coPa) {
			rLog += `err070: compDef param ${nName} is already used!\n`;
			rErr = true;
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
			rErr = true;
		}
	}
	rLog += `info031: ${compDef.partName} ${Object.keys(coPa).length} parameters, overwritten: ${Object.keys(ci.pa).length}\n`;
	return [coPa, rLog, rErr];
}

function initCO(compDef: tParamDef, ci: tCompIn): tCompOut {
	let rLog = `Component: ${compDef.partName} :: ${ci.instName}\n`;
	const [ipa, ipaLog, iErr] = combineParams(compDef, ci);
	rLog += ipaLog;
	// prepare output
	const rCO: tCompOut = {
		partName: compDef.partName,
		instName: ci.instName,
		calcErr: iErr,
		logstr: rLog,
		pa: ipa,
		metrics: {},
		sub: {}
	};
	return rCO;
}

function enhanceInstName(instName: string): string {
	const regex = /\[\\,\/\]/;
	const rName = instName.replaceAll(regex, '_');
	return rName;
}

function generateOutputFiles(instName: string, co: tCompOut) {
	const eInstName = enhanceInstName(instName);
	sBlob.saveBlob(`${eInstName}_log.txt`, co.logstr);
}

function computeSubComp(instName: string, isub: tSubRecord): [tSubORecord, string, boolean] {
	const rSub: tSubORecord = {};
	let rLog = '';
	let rErr = false;
	for (const kk in isub) {
		const vv = isub[kk];
		if (vv.component) {
			const instN2 = `${instName}/${kk}`;
			const ci: tCompIn = { instName: instN2, pa: vv.pa, suffix: '' };
			rLog += `[csc ${kk}] ${instN2}\n`;
			try {
				const co = vv.component.compCompute(ci);
				generateOutputFiles(instN2, co);
				rSub[kk] = co;
				rLog += co.logstr;
			} catch (eMsg) {
				rLog += `err065: Error while computing sub-component ${instN2}\n`;
				rLog += eMsg;
				rErr = true;
			}
		} else {
			rLog += `warn096: ${kk} has no assigned component!\n`;
		}
	}
	return [rSub, rLog, rErr];
}

export { combineParams, initCO, computeSubComp, generateOutputFiles };
