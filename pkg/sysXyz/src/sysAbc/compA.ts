// compA.ts
// the component A of the system Abc

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator, initCO } from 'systemix';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compA',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('Da', 'mm', 50, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('Ha', 'mm', 40, 10, 1000, 1)
	],
	paramSvg: {
		Di: 'compAbc.svg',
		Da: 'compAbc.svg',
		Ha: 'compAbc.svg'
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
			D1: pa.Da,
			Di: pa.Di,
			T1: pa.Ha
		}
	};
	// step25: optional sub-components definition
	// step26: compute sub-components
	// step27: compute metrics (post-calculation)
	rCO.metrics['weight'] = (pa.Da - pa.Di) * pa.Ha;
	// step28: return component output
	return rCO;
}

// step30: component definition
const compASDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compA is the first shape of sysAbc',
	compParams: compDef,
	compCompute: compCompute
};

export { compASDef };
