// compX.ts
// the component X of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator, initCO } from 'systemix';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compX',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('Q1', 'mm', 50, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('H1', 'mm', 40, 10, 1000, 1),
		pNumber('R1', 'mm', 5, 0, 100, 1)
	],
	paramSvg: {
		Di: 'compXyz.svg',
		Q1: 'compXyz.svg',
		H1: 'compXyz.svg',
		R1: 'compXyz.svg'
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
		url: 'https://charlyoleg2.github.io/parame77/desi77/square',
		partName: 'square',
		objectName: 'squareDef',
		//objectDef?: squareDef,
		pxJson: {
			W1: pa.Q1,
			Di: pa.Di,
			T1: pa.H1,
			R1: pa.R1
		}
	};
	// step25: optional sub-components definition
	// step26: compute sub-components
	// step27: compute metrics (post-calculation)
	rCO.metrics['weight'] = (pa.Q1 - pa.Di) * pa.H1;
	// step28: return component output
	return rCO;
}

// step30: component definition
const compXSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compX is the shape of the stage-1',
	compParams: compDef,
	compCompute: compCompute
};

export { compXSDef };
