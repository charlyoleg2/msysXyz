#!/usr/bin/env node
// sysXyz-cli.ts
// the CLI of the package sysXyz

import { compXyzSDef } from 'sysXyz';
import { compXyzIn } from 'sysXyz';
//import { generateOutputFiles, sysBlob } from 'systemix';
import { generateOutputFiles } from 'systemix';
import { writeOutputFiles } from './systemcli';
//import { sBlob } from 'systemix'; // singleton issue with 3 packages
import { sBlob } from 'sysXyz'; // workaround for the singleton issue

// instanciate the single reference to SysBlob
//const sBlob = sysBlob();

const genStlOscadStart = `#!/usr/bin/env bash
# gen_stl_Xyz.sh

cd $(dirname $0)/..

echo "gen_stl_Xyz.sh says Hello"
`;
const genStlOscadEnd = `
echo "generate STL-assembly with OpenSCAD"
cp scr/Xyz_assembly.scad tmp2/
openscad -o tmp2/Xyz_assembly.stl tmp2/Xyz_assembly.scad

echo "ls -ltra pkg/sysXyz-cli/tmp2"
ls -ltra tmp2
echo "(cd pkg/sysXyz-cli && f3d tmp2/Xyz_assembly.stl)"
echo "gen_stl_Xyz.sh says Bye"
`;

// compute the system
try {
	// compute the component compXyz
	const compXyzOut = compXyzSDef.compCompute(compXyzIn);
	generateOutputFiles(compXyzIn.instName, compXyzOut, sBlob);
	sBlob.saveBlob(
		`gen_stl_${compXyzIn.instName}.sh`,
		genStlOscadStart + sBlob.getPartialBlob('genStlOscad') + genStlOscadEnd
	);
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
