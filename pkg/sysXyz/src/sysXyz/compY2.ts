// compY2.ts
// the sub-component Y2 of the component Y of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator, initCO } from 'systemix';

// step10: defintion of component parameters
const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compY2',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('T2', 'mm', 70, 1, 500, 1),
		pNumber('N2', 'triangles', 3, 1, 10, 1),
		pSectionSeparator('heights and details'),
		pNumber('H1', 'mm', 40, 10, 1000, 1),
		pNumber('R2', 'mm', 5, 0, 100, 1)
	],
	paramSvg: {
		Di: 'compXyz_compY.svg',
		T2: 'compXyz_compY.svg',
		N2: 'compXyz_compY.svg',
		H1: 'compXyz_compY.svg',
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
	const vH1 = pa.H1 / (1 + 2 * (pa.N2 - 1));
	// step22: check parameters
	if (vH1 < 1.0) {
		throw `err044: vH1 ${vH1} is too small`;
	}
	// step23: log
	rCO.logstr += `vH1: ${vH1} mm, N2: ${pa.N2}\n`;
	// step24: optional parametrix view
	rCO.parametrix = {
		url: 'https://charlyoleg2.github.io/parame77/desi77/triangle',
		partName: 'triangle',
		objectName: 'triangleDef',
		//objectDef?: triangleDef,
		pxJson: {
			W1: pa.T2,
			R1: pa.R2,
			T1: vH1,
			E1: vH1,
			N1: pa.N2,
			Di: pa.Di
		}
	};
	// step25: optional sub-components definition
	// step26: compute sub-components
	// step27: compute metrics (post-calculation)
	rCO.metrics['weight'] = ((pa.T2 - pa.Di) * pa.H1) / pa.N2;
	// step28: return component output
	return rCO;
}

// step30: component definition
const compY2SDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compY2 is the detailed component of compY',
	compParams: compDef,
	compCompute: compCompute
};

export { compY2SDef };
