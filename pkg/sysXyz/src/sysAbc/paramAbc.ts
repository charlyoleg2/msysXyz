// paramAbc.ts
// the parametrization of the top-level component compAbc

import type { tParamVal, tCompIn } from 'systemix';
//import { compAbcSDef } from './compAbc';

// the parametrization
const AbcParams: tParamVal = {
	Di: 30,
	Da: 70,
	Db: 50,
	Ha: 30,
	E1: 20,
	Hb: 50
};

// inputs for compAbc
const compAbcIn: tCompIn = {
	instName: 'Abc',
	pa: AbcParams,
	suffix: ''
};

// compute the component compAbc
//const compAbcOut = compAbcSDef.compCompute(compAbcIn);

// Use some results
//console.log(`sys-Abc metrics: weight: ${compAbcOut.metrics.weight} kg`);

export { compAbcIn };
