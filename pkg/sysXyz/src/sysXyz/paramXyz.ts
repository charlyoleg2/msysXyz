// paramXyz.ts
// the parametrization of the top-level component compXyz

import type { tParamVal, tCompIn } from 'systemix';
//import { compXyzSDef } from './compXyz';

// the parametrization
const XyzParams: tParamVal = {
	Di: 25,
	H1: 15,
	H2: 5,
	stage2: 1
};

// inputs for compXyz
const compXyzIn: tCompIn = {
	instName: 'Xyz',
	pa: XyzParams,
	suffix: ''
};

// compute the component compXyz
//const compXyzOut = compXyzSDef.compCompute(compXyzIn);

// Use some results
//console.log(`sys-Xyz metrics: weight: ${compXyzOut.metrics.weight} kg`);

export { compXyzIn };
