// compXyz.ts
// the top-level component of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pDropdown, pSectionSeparator } from 'systemix';

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
		Di: 'compXYZ.svg',
		D3: 'compXYZ.svg',
		T2: 'compXYZ.svg',
		Q1: 'compXYZ.svg',
		H1: 'compXYZ.svg',
		H2: 'compXYZ.svg',
		stage2: 'compXyz.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function compCompute(compIn: tCompIn): tCompOut {
	const rCO: tCompOut = {
		partName: compDef.partName,
		instanceName: compIn.instName,
		calcErr: false,
		logstr: `Component: ${compDef.partName} :: ${compIn.instName}`,
		metrics: {},
		parametrix: {
			url: 'https://charlyoleg2.github.io/parame76/desi76/compXYZ',
			partName: 'compXyz',
			objectName: 'compXyzDef',
			//objectDef?: compXyzDef,
			pxJson: {}
		},
		sub: {}
	};
	rCO.metrics['weight'] = 53;
	return rCO;
}

const compXyzSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compXyz is an alignment of three shapes',
	compParams: compDef,
	compCompute: compCompute
};

export { compXyzSDef };
