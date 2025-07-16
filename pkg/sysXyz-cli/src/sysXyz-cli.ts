#!/usr/bin/env node
// sysXyz-cli.ts
// the CLI of the package sysXyz

import { compXyzSDef } from 'sysXyz';
import { compXyzIn } from 'sysXyz';
import { generateOutputFiles } from 'systemix';
import { writeOutputFiles } from './systemcli';

try {
	// compute the component compXyz
	const compXyzOut = compXyzSDef.compCompute(compXyzIn);
	generateOutputFiles(compXyzIn.instName, compXyzOut);
	console.log(`[top-level err] ${compXyzOut.calcErr}`);
	console.log(`[top-level log] ${compXyzOut.logstr}`);
	// Use some results
	console.log(`sysXyz metrics: weight: ${compXyzOut.metrics.weight} kg`);
	// write output files
	await writeOutputFiles('tmp');
} catch (eMsg) {
	console.log('err011: Error while computing top-level component');
	console.log(eMsg);
}
