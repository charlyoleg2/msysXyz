// compZ.ts
// the component Z of the system Xyz

//import type { tParamDef, tParamVal, tCompIn, tCompOut, tComponentDef } from 'systemix';
import type { tParamDef, tCompIn, tCompOut, tComponentDef } from 'systemix';
//import { pNumber, pCheckbox, pDropdown, pSectionSeparator } from 'systemix';
import { pNumber, pSectionSeparator, combineParams } from 'systemix';

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
	let rLog = `Component: ${compDef.partName} :: ${ci.instName}\n`;
	const [ipa, ipaLog] = combineParams(compDef, ci);
	rLog += ipaLog;
	// prepare output
	const rCO: tCompOut = {
		partName: compDef.partName,
		instanceName: ci.instName,
		calcErr: false,
		logstr: '',
		pa: {},
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
	// define sub-components
	// complete output
	rCO.metrics['weight'] = (ipa.D3 - ipa.Di) * ipa.H1;
	rCO.logstr += rLog;
	return rCO;
}

const compZSDef: tComponentDef = {
	compName: compDef.partName,
	compDescription: 'compZ is the shape of third stage',
	compParams: compDef,
	compCompute: compCompute
};

export { compZSDef };
