#!/usr/bin/env node
// sysXyz-cli.ts
// the CLI of the package sysXyz

import { compXyzSDef } from 'sysXyz';
import { compXyzIn } from 'sysXyz';
import { generateOutputFiles, sysBlob } from 'systemix';
import { writeOutputFiles } from './systemcli';

// instanciate the single reference to SysBlob
const sBlob = sysBlob();

// compute the system
try {
	// compute the component compXyz
	const compXyzOut = compXyzSDef.compCompute(compXyzIn, sBlob);
	generateOutputFiles(compXyzIn.instName, compXyzOut, sBlob);
	console.log(`[top-level err] ${compXyzOut.calcErr}`);
	console.log(`[top-level log] ${compXyzOut.logstr}`);
	// Use some results
	console.log(`sysXyz metrics: weight: ${compXyzOut.metrics.weight} kg`);
	// write output files
	await writeOutputFiles('tmp', sBlob);
} catch (eMsg) {
	console.log('err011: Error while computing top-level component');
	console.log(eMsg);
}
