// compZ.ts
// the component Z of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator, initCO } from 'systemix';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compZ',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('D3', 'mm', 50, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('H1', 'mm', 40, 10, 1000, 1)
	],
	paramSvg: {
		Di: 'compXyz.svg',
		D3: 'compXyz.svg',
		H1: 'compXyz.svg'
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
	// step23: log
	// step24: optional parametrix view
	rCO.parametrix = {
		url: 'https://charlyoleg2.github.io/parame77/desi77/cylinder',
		partName: 'cylinder',
		objectName: 'cylinderDef',
		//objectDef?: cylinderDef,
		pxJson: {
			D1: pa.D3,
			Di: pa.Di,
			T1: pa.H1
		}
	};
	// step25: optional sub-components definition
	// step26: compute sub-components
	// step27: compute metrics (post-calculation)
	rCO.metrics['weight'] = (pa.D3 - pa.Di) * pa.H1;
	// step28: return component output
	return rCO;
}

// step30: component definition
const compZSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compZ is the shape of third stage',
	compParams: compDef,
	compCompute: compCompute
};

export { compZSDef };
