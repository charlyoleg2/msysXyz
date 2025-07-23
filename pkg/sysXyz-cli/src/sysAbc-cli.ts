#!/usr/bin/env node
// sysAbc-cli.ts
// the CLI of the system sysAbc of the package sysXyz

import { compAbcSDef } from 'sysXyz';
import { compAbcIn } from 'sysXyz';

import type { tVec3 } from 'systemix';
//import { generateOutputFiles, sysBlob } from 'systemix';
import { generateOutputFiles } from 'systemix';
import { writeOutputFiles } from './systemcli';
//import { sBlob } from 'systemix'; // singleton issue with 3 packages
import { sBlob } from 'sysXyz'; // workaround for the singleton issue

// instanciate the single reference to SysBlob
//const sBlob = sysBlob();

const asmStlOscadStart = `// Abc_assembly.scad
`;
const asmStlOscadEnd = `
module Abc_system () {
	union () {
		Abc_Xyz_stage1();
		//Abc_Xyz_stage2();
		Abc_Xyz_stage3();
		Abc_Xyz_stage2_refine();
	}
}

Abc_system();
`;

const asmStlFcStart = `# Abc_assembly_fc.py
# run the script with:
# freecad.cmd myScript.py

import FreeCAD as App
#import Part
import Mesh

#print(sys.argv)
outFileName = "Abc_assembly_fc"
if (len(sys.argv) == 3):
	outFileName = sys.argv[2]
print(f"outFileName: {outFileName}")

### directly working with Mesh
def mesh_Abc_assembly():
`;
const asmStlFcEnd = `	assembly = MAbc_Xyz_stage1
	#assembly = assembly.unite(MAbc_Xyz_stage2)
	assembly = assembly.unite(MAbc_Xyz_stage3)
	assembly = assembly.unite(MAbc_Xyz_stage2_refine)
	#assembly.write(f"{outFileName}.stl", "AST")
	assembly.write(f"{outFileName}.stl")

mesh_Abc_assembly()
`;

const genStlOscadStart = `#!/usr/bin/env bash
# gen_stl_Abc.sh

cd $(dirname $0)/..

echo "gen_stl_Abc.sh says Hello"
`;
const genStlOscadEnd = `
echo "generate STL-assembly with OpenSCAD"
cp tmp/Abc_assembly.scad tmp2/
openscad -o tmp2/Abc_assembly.stl tmp2/Abc_assembly.scad

echo "ls -ltra pkg/sysXyz-cli/tmp2"
ls -ltra tmp2
echo "(cd pkg/sysXyz-cli && f3d tmp2/Abc_assembly.stl)"
echo "gen_stl_Abc.sh says Bye"
`;

const genStlFcStart = `#!/usr/bin/env bash
# gen_stl_Abc_fc.sh

cd $(dirname $0)/..

echo "gen_stl_Abc_fc.sh says Hello"
`;
const genStlFcEnd = `
echo "generate STL-assembly with FreeCAD"
cp tmp/Abc_assembly_fc.py tmp2/
(cd tmp2 && freecad.cmd Abc_assembly_fc.py Abc_assembly_fc)

echo "ls -ltra pkg/sysXyz-cli/tmp2"
ls -ltra tmp2
echo "(cd pkg/sysXyz-cli && f3d tmp2/Abc_assembly_fc.stl)"
echo "gen_stl_Abc_fc.sh says Bye"
`;

// compute the system
try {
	// compute the component compAbc
	const compAbcOut = compAbcSDef.compCompute(compAbcIn);
	const AbcOrien: tVec3 = [0, 0, 0];
	const AbcPos: tVec3 = [0, 0, 0];
	generateOutputFiles(compAbcIn.instName, compAbcOut, AbcOrien, AbcPos, sBlob);
	sBlob.saveBlob(
		`${compAbcIn.instName}_assembly.scad`,
		asmStlOscadStart + sBlob.getPartialBlob('asmStlOscad') + asmStlOscadEnd
	);
	sBlob.saveBlob(
		`gen_stl_${compAbcIn.instName}.sh`,
		genStlOscadStart + sBlob.getPartialBlob('genStlOscad') + genStlOscadEnd
	);
	sBlob.saveBlob(
		`${compAbcIn.instName}_assembly_fc.py`,
		asmStlFcStart + sBlob.getPartialBlob('asmStlFc') + asmStlFcEnd
	);
	sBlob.saveBlob(
		`gen_stl_${compAbcIn.instName}_fc.sh`,
		genStlFcStart + sBlob.getPartialBlob('genStlFc') + genStlFcEnd
	);
	console.log(`[top-level err] ${compAbcOut.calcErr}`);
	console.log(`[top-level log] ${compAbcOut.logstr}`);
	// Use some results
	console.log(`sysAbc metrics: weight: ${compAbcOut.metrics.weight} kg`);
	// write output files
	await writeOutputFiles('tmp', sBlob);
} catch (eMsg) {
	console.log('err011: Error while computing top-level component');
	console.log(eMsg);
}
