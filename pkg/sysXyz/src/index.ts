// index.ts
// list of system definition

import { compXyzSDef } from './compXyz';
import { compXyzIn } from './sysXyz';

// compute the component compXyz
const compXyzOut = compXyzSDef.compCompute(compXyzIn);

// Use some results
console.log(`sysXyz metrics: weight: ${compXyzOut.metrics.weight} kg`);
