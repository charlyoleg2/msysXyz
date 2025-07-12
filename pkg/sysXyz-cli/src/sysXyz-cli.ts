#!/usr/bin/env node
// sysXyz-cli.ts
// the CLI of the package sysXyz

import { compXyzSDef } from 'sysXyz';
import { compXyzIn } from 'sysXyz';

// compute the component compXyz
const compXyzOut = compXyzSDef.compCompute(compXyzIn);
console.log(`[top-level err] ${compXyzOut.calcErr}`);
console.log(`[top-level log] ${compXyzOut.logstr}`);

// Use some results
console.log(`sysXyz metrics: weight: ${compXyzOut.metrics.weight} kg`);
