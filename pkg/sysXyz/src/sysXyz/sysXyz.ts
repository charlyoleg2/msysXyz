// sysXyz.ts
// the parametrization of the top-level component compXyz

import type { tParamVal, tCompIn } from 'systemix';
//import { compXyzSDef } from './compXyz';

// the parametrization
const sysXyzParams: tParamVal = {
	Di: 25,
	H1: 15
};

// inputs for compXyz
const compXyzIn: tCompIn = {
	instName: 'Xyz',
	pa: sysXyzParams,
	suffix: ''
};

// compute the component compXyz
//const compXyzOut = compXyzSDef.compCompute('Xyz', 0, sysXyzParams);

// Use some results
//console.log(`sysXyz metrics: weight: ${compXyzOut.metrics.weight} kg`);

export { compXyzIn };
