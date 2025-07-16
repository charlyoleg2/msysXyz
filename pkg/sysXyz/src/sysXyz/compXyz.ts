// compXyz.ts
// the top-level component of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tSubRecord, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pDropdown, pSectionSeparator, initCO, computeSubComp } from 'systemix';

import { compXSDef } from './compX';
import { compYSDef } from './compY';
import { compZSDef } from './compZ';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compXyz',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('D3', 'mm', 50, 1, 500, 1),
		pNumber('T2', 'mm', 70, 1, 500, 1),
		pNumber('Q1', 'mm', 50, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('H1', 'mm', 40, 10, 1000, 1),
		pNumber('H2', 'mm', 40, 10, 1000, 1),
		pDropdown('stage2', ['square', 'triangle', 'cylinder'])
	],
	paramSvg: {
		Di: 'compXyz.svg',
		D3: 'compXyz.svg',
		T2: 'compXyz.svg',
		Q1: 'compXyz.svg',
		H1: 'compXyz.svg',
		H2: 'compXyz.svg',
		stage2: 'compXyz.svg'
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
	const Zoffset = pa.H1 + pa.H2;
	const Wmax = Math.max(pa.Q1, pa.T2, pa.D3);
	const Wmin = Math.min(pa.Q1, pa.T2, pa.D3);
	// step22: check parameters
	if (Wmin < pa.Di) {
		throw `err052: Wmin ${Wmin} is smaller than Di ${pa.Di}`;
	}
	// step23: log
	rCO.logstr += `Wmax: ${Wmax}, Wmin: ${Wmin}, Di: ${pa.Di} mm`;
	// step24: optional parametrix view
	//rCO.parametrix = {
	//	url: 'https://charlyoleg2.github.io/parame77/desi77/compXyz',
	//	partName: 'compXyz',
	//	objectName: 'compXyzDef',
	//	//objectDef?: compXyzDef,
	//	pxJson: {}
	//};
	// step25: optional sub-components definition
	const isub: tSubRecord = {
		stage1: {
			component: compXSDef,
			pa: {
				Di: pa.Di,
				Q1: pa.Q1,
				H1: pa.H1
			},
			orientation: [0, 0, 0],
			position: [0, 0, 0]
		},
		stage2: {
			component: compYSDef,
			pa: {
				Di: pa.Di,
				T2: pa.T2,
				H1: pa.H1,
				stage2: pa.stage2
			},
			orientation: [0, 0, 0],
			position: [0, 0, Zoffset]
		},
		stage3: {
			component: compZSDef,
			pa: {
				Di: pa.Di,
				D3: pa.D3,
				H1: pa.H1
			},
			orientation: [0, 0, 0],
			position: [0, 0, 2 * Zoffset]
		}
	};
	rCO.sub = isub;
	// step26: compute sub-components
	const [osub, log2, err2] = computeSubComp(ci.instName, isub);
	rCO.logstr += log2;
	rCO.calcErr ||= err2;
	// step27: compute metrics (post-calculation)
	rCO.metrics['weight'] =
		osub.stage1.metrics.weight + osub.stage2.metrics.weight + osub.stage3.metrics.weight + 5;
	// step28: return component output
	return rCO;
}

// step30: component definition
const compXyzSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compXyz is an alignment of three shapes',
	compParams: compDef,
	compCompute: compCompute
};

export { compXyzSDef };
