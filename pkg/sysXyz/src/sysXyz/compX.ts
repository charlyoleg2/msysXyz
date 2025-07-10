// compX.ts
// the component X of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator, combineParams } from 'systemix';

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

function compCompute(ci: tCompIn): tCompOut {
	const ipa = combineParams(compDef, ci);
	// prepare output
	const rCO: tCompOut = {
		partName: compDef.partName,
		instanceName: ci.instName,
		calcErr: false,
		logstr: `Component: ${compDef.partName} :: ${ci.instName}`,
		metrics: {},
		parametrix: {
			url: 'https://charlyoleg2.github.io/parame76/desi76/compX',
			partName: 'compX',
			objectName: 'compXDef',
			//objectDef?: compXDef,
			pxJson: {}
		},
		sub: {}
	};
	// define sub-components
	// complete output
	rCO.metrics['weight'] = (ipa.Q1 - ipa.Di) * ipa.H1;
	return rCO;
}

const compXSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compX is the shape of the stage-1',
	compParams: compDef,
	compCompute: compCompute
};

export { compXSDef };
