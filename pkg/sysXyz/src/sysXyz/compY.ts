// compY.ts
// the component Y of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pDropdown, pSectionSeparator } from 'systemix';
import { compY2SDef } from './compY2';

const compDef: tParamDef = {
	// partName is used in URL. Choose a name without slash, backslash and space.
	partName: 'compY',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('Di', 'mm', 30, 1, 500, 1),
		pNumber('T2', 'mm', 70, 1, 500, 1),
		pSectionSeparator('heights and details'),
		pNumber('H1', 'mm', 40, 10, 1000, 1),
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

function compCompute(ci: tCompIn): tCompOut {
	const rCO: tCompOut = {
		partName: compDef.partName,
		instanceName: ci.instName,
		calcErr: false,
		logstr: `Component: ${compDef.partName} :: ${ci.instName}`,
		metrics: {},
		parametrix: {
			url: 'https://charlyoleg2.github.io/parame76/desi76/compY',
			partName: 'compY',
			objectName: 'compYDef',
			//objectDef?: compYDef,
			pxJson: {}
		},
		sub: {
			refine: {
				component: compY2SDef,
				pa: {
					Di: ci.pa.Di,
					T2: ci.pa.T2,
					H1: ci.pa.H1,
					N2: 3
				},
				orientation: [0, 0, 0],
				position: [0, 0, ci.pa.H1 + ci.pa.H2]
			}
		}
	};
	rCO.metrics['weight'] = 8;
	return rCO;
}

const compYSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compY is the shape of the stage 2',
	compParams: compDef,
	compCompute: compCompute
};

export { compYSDef };
