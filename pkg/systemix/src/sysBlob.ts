// sysBlob.ts of systemix

interface tBlob {
	fName: string;
	fBlob: string;
}

class sysBlob {
	fBlob: tBlob[];
	constructor() {
		this.fBlob = [];
		console.log('dbg012: instanciate singleton sBlob');
	}
	getNames(): string[] {
		const rNames = this.fBlob.map((iblob) => iblob.fName);
		return rNames;
	}
	listNames() {
		const fNames = this.getNames();
		console.log('sysBlob list:');
		for (const [idx, one] of fNames.entries()) {
			console.log(`${idx + 1} : ${one}`);
		}
	}
	saveBlob(iFileName: string, iBlob: string) {
		//console.log(`dbg014: iFileName: ${iFileName}`);
		this.fBlob.push({ fName: iFileName, fBlob: iBlob });
	}
	flushBlobs() {
		this.fBlob = [];
	}
	getBlobs(): tBlob[] {
		return this.fBlob;
	}
	createZip(): string {
		const rZip = 'this is a zip';
		return rZip;
	}
}

const sBlob = new sysBlob();

export type { tBlob, sysBlob };
export { sBlob };
