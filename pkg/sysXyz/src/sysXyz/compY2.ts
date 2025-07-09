// compY2.ts
// the sub-component Y2 of the component Y of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator } from 'systemix';

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

function compCompute(ci: tCompIn): tCompOut {
	const rCO: tCompOut = {
		partName: compDef.partName,
		instanceName: ci.instName,
		calcErr: false,
		logstr: `Component: ${compDef.partName} :: ${ci.instName}`,
		metrics: {},
		parametrix: {
			url: 'https://charlyoleg2.github.io/parame76/desi76/compY',
			partName: 'compY2',
			objectName: 'compY2Def',
			//objectDef?: compY2Def,
			pxJson: {}
		},
		sub: {}
	};
	rCO.metrics['weight'] = ((ci.pa.T2 - ci.pa.Di) * ci.pa.H1) / ci.pa.N2;
	return rCO;
}

const compY2SDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compY2 is the detailed component of compY',
	compParams: compDef,
	compCompute: compCompute
};

export { compY2SDef };
