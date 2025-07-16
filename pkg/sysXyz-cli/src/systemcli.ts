// systemcli.ts
// the library for helping creating a systemix cli

import fs from 'node:fs/promises';
import { sBlob } from 'systemix';

async function writeOneTxtFile(iFileName: string, iFileBlob: string) {
	try {
		await fs.writeFile(iFileName, iFileBlob);
	} catch (err) {
		console.log(err);
	}
}

async function writeOutputFiles(outDirName: string) {
	try {
		const createDir = await fs.mkdir(outDirName, { recursive: true });
		console.log(`The directory ${createDir} is created`);
	} catch (err) {
		console.error(err);
	}
	for (const blob of sBlob.getBlobs()) {
		await writeOneTxtFile(blob.fName, blob.fBlob);
	}
}

export { writeOutputFiles };
