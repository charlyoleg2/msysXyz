// systemcli.ts
// the library for helping creating a systemix cli

import path from 'node:path';
import fs from 'node:fs/promises';
import type { SysBlob } from 'systemix';
//import { sBlob } from 'systemix';

async function writeOneTxtFile(iFileName: string, iFileBlob: string) {
	try {
		console.log(`Write file ${iFileName}`);
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
	for (const blob of sB.getBlobs()) {
		const fPath = path.join(outDirName, blob.fName);
		await writeOneTxtFile(fPath, blob.fBlob);
	}
}

export { writeOutputFiles };
