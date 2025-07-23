// compAbc.ts
// the top-level component of the system Abc

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef, SysBlob } from 'systemix';
import type { tParamDef, tSubRecord, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pDropdown, pSectionSeparator, initCO, computeSubComp } from 'systemix';
import { pNumber, pSectionSeparator, initCO, computeSubComp } from 'systemix';

import { compASDef } from './compA';
import { compXyzSDef } from '../sysXyz/compXyz';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compAbc',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('Da', 'mm', 100, 1, 500, 1),
		pNumber('Db', 'mm', 100, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('Ha', 'mm', 50, 10, 1000, 1),
		pNumber('Hb', 'mm', 50, 10, 1000, 1),
		pNumber('E1', 'mm', 50, 1, 1000, 1)
	],
	paramSvg: {
		Di: 'compAbc.svg',
		Da: 'compAbc.svg',
		Db: 'compAbc.svg',
		Ha: 'compAbc.svg',
		Hb: 'compAbc.svg',
		E1: 'compAbc.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step20: function definiton of compute component
function compCompute(ci: tCompIn): tCompOut {
	const rCO = initCO(compDef, ci);
	const pa = rCO.pa;
	// step21: compute intermediate parameters (pre-calculation)
	const Htot = pa.Ha + pa.E1 + pa.Hb;
	const Hbp = pa.Hb / 8;
	// step22: check parameters
	if (pa.Hb < 20) {
		throw `err048: Hb ${pa.Hb} must be bigger than 20`;
	}
	// step23: log
	rCO.logstr += `Abc-height: ${Htot} mm\n`;
	// step24: optional parametrix view
	// step25: optional sub-components definition
	const isub: tSubRecord = {
		partA: {
			component: compASDef,
			pa: {
				Di: pa.Di,
				Da: pa.Da,
				Ha: pa.Ha
			},
			orientation: [0, 0, 0],
			position: [0, 0, 0]
		},
		partB: {
			component: compXyzSDef,
			pa: {
				Di: pa.Di,
				D3: pa.Db,
				T2: pa.Db * 1.5,
				Q1: pa.Db * 1.2,
				H1: Hbp * 2,
				H2: Hbp,
				stage2: 1
			},
			orientation: [0, 0, 0],
			position: [0, 0, pa.Ha + pa.E1]
		}
	};
	rCO.sub = isub;
	// step26: compute sub-components
	const [osub, log2, err2] = computeSubComp(ci.instName, isub);
	rCO.logstr += log2;
	rCO.calcErr ||= err2;
	// step27: compute metrics (post-calculation)
	rCO.metrics['weight'] = osub.partA.metrics.weight + osub.partB.metrics.weight + 3.5;
	// step28: return component output
	return rCO;
}

// step30: component definition
const compAbcSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compAbc is the top-level component of sysAbc',
	compParams: compDef,
	compCompute: compCompute
};

export { compAbcSDef };
