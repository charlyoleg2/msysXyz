// systemcli.ts
// the library for helping creating a systemix cli

import path from 'node:path';
import fs from 'node:fs/promises';
import type { SysBlob } from 'systemix';
//import { sBlob } from 'systemix';

async function writeOneTxtFile(iFileName: string, iFileBlob: string, idx: number) {
	try {
		console.log(`${idx} : Write file ${iFileName}`);
		await fs.writeFile(iFileName, iFileBlob);
	} catch (err) {
		console.log(err);
	}
}

async function writeOutputFiles(outDirName: string, sB: SysBlob) {
	try {
		await fs.rm(outDirName, { recursive: true, force: true }); // optional cleaning
		await fs.mkdir(outDirName, { recursive: true });
		console.log(`Create the directory ${outDirName}`);
	} catch (err) {
		console.error(err);
	}
	let ii = 0;
	for (const blob of sB.getBlobs()) {
		ii += 1;
		const fPath = path.join(outDirName, blob.fName);
		await writeOneTxtFile(fPath, blob.fBlob, ii);
	}
}

export { writeOutputFiles };
