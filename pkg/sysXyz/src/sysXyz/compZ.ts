// compZ.ts
// the component Z of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator } from 'systemix';

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

function compCompute(ci: tCompIn): tCompOut {
	const rCO: tCompOut = {
		partName: compDef.partName,
		instanceName: ci.instName,
		calcErr: false,
		logstr: `Component: ${compDef.partName} :: ${ci.instName}`,
		metrics: {},
		parametrix: {
			url: 'https://charlyoleg2.github.io/parame76/desi76/compZ',
			partName: 'compZ',
			objectName: 'compZDef',
			//objectDef?: compZDef,
			pxJson: {}
		},
		sub: {}
	};
	rCO.metrics['weight'] = (ci.pa.D3 - ci.pa.Di) * ci.pa.H1;
	return rCO;
}

const compZSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compZ is the shape of third stage',
	compParams: compDef,
	compCompute: compCompute
};

export { compZSDef };
