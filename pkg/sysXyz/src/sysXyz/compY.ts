// compY.ts
// the component Y of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef, SysBlob } from 'systemix';
import type { tParamDef, tSubRecord, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pDropdown, pSectionSeparator, initCO, computeSubComp } from 'systemix';
import { pNumber, pDropdown, pSectionSeparator, initCO, computeSubComp } from 'systemix';

import { compY2SDef } from './compY2';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compY',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('T2', 'mm', 70, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('H1', 'mm', 40, 10, 1000, 1),
		pNumber('Zpos', 'mm', 50, -1000, 1000, 1),
		pDropdown('stage2', ['square', 'triangle', 'cylinder']),
		pNumber('R2', 'mm', 5, 0, 100, 1)
	],
	paramSvg: {
		Di: 'compXyz_compY.svg',
		T2: 'compXyz_compY.svg',
		H1: 'compXyz_compY.svg',
		stage2: 'compXyz_compY.svg',
		R2: 'compXyz_compY.svg'
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
	// step22: check parameters
	if (pa.stage2 > 2) {
		throw `err045: stage2 ${pa.stage2} is out of range`;
	}
	// step23: log
	rCO.logstr += `stage2: ${pa.stage2} [0: square, 1: triangle, 2: cylinder]\n`;
	// step24: optional parametrix view
	// step25: optional sub-components definition
	// step26: compute sub-components
	// step27: compute metrics (post-calculation)
	if (pa.stage2 === 0) {
		rCO.parametrix = {
			url: 'https://charlyoleg2.github.io/parame77/desi77/square',
			partName: 'square',
			objectName: 'square',
			//objectDef?: squareDef,
			pxJson: {
				W1: pa.T2,
				Di: pa.Di,
				T1: pa.H1,
				R1: pa.R2
			}
		};
		rCO.metrics['weight'] = pa.T2 + 2.5;
	} else if (pa.stage2 === 1) {
		rCO.parametrix = {
			url: 'https://charlyoleg2.github.io/parame77/desi77/triangle',
			partName: 'triangle',
			objectName: 'triangleDef',
			//objectDef?: triangleDef,
			pxJson: {
				W1: pa.T2,
				Di: pa.Di,
				T1: pa.H1,
				N1: 1,
				R1: pa.R2
			}
		};
		// define sub-components
		const isub: tSubRecord = {
			refine: {
				component: compY2SDef,
				pa: {
					Di: pa.Di,
					T2: pa.T2,
					H1: pa.H1,
					N2: 3
				},
				orientation: [0, 0, 0],
				position: [0, 0, pa.Zpos]
			}
		};
		const [osub, log2, err2] = computeSubComp(ci.instName, isub);
		rCO.logstr += log2;
		rCO.calcErr ||= err2;
		// complete output
		rCO.sub = isub;
		rCO.metrics['weight'] = osub.refine.metrics.weight + 0.5;
	} else if (pa.stage2 === 2) {
		rCO.parametrix = {
			url: 'https://charlyoleg2.github.io/parame77/desi77/cylinder',
			partName: 'cylinder',
			objectName: 'cylinder',
			//objectDef?: cylinderDef,
			pxJson: {
				D1: pa.T2,
				Di: pa.Di,
				T1: pa.H1
			}
		};
		rCO.metrics['weight'] = pa.T2 + 3.5;
	} else {
		rCO.calcErr = true;
		rCO.logstr += `err071: compY param stage2 ${pa.stage2} is out of range\n`;
	}
	// step28: return component output
	return rCO;
}

// step30: component definition
const compYSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compY is the shape of the stage 2',
	compParams: compDef,
	compCompute: compCompute
};

export { compYSDef };
