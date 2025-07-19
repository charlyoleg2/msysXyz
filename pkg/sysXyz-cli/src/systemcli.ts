// systemcli.ts
// the library for helping creating a systemix cli

import path from 'node:path';
import fs from 'node:fs/promises';
import type { SysBlob } from 'systemix';
//import { sBlob } from 'systemix'; // issue of singleton with 3 packages
//import { sBlob } from 'sysXyz'; // workaround for the singleton issue

async function writeOneTxtFile(iFileName: string, iFileBlob: string, idx: number) {
	try {
		console.log(`${idx} : Write file ${iFileName}`);
		await fs.writeFile(iFileName, iFileBlob);
	} catch (err) {
		console.log(err);
	}
}

async function writeOutputFiles(outDirName: string, iBlob: SysBlob) {
	try {
		await fs.rm(outDirName, { recursive: true, force: true }); // optional cleaning
		await fs.mkdir(outDirName, { recursive: true });
		console.log(`Create the directory ${outDirName}`);
	} catch (err) {
		console.error(err);
	}
	let ii = 0;
	for (const blob of iBlob.getBlobs()) {
		ii += 1;
		const fPath = path.join(outDirName, blob.fName);
		await writeOneTxtFile(fPath, blob.fBlob, ii);
	}
}

export { writeOutputFiles };
