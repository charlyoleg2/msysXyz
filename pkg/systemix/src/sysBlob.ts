// sysBlob.ts of systemix

interface tBlob {
	fName: string;
	fBlob: string;
}

class SysBlob {
	fNB: tBlob[];
	constructor() {
		//console.log('dbg012: instanciate singleton sBlob start');
		this.fNB = [];
		//console.log('dbg018: instanciate singleton sBlob end');
	}
	getNames(): string[] {
		const rNames = this.fNB.map((iblob) => iblob.fName);
		return rNames;
	}
	listNames() {
		const fNames = this.getNames();
		console.log('SysBlob list:');
		for (const [idx, one] of fNames.entries()) {
			console.log(`${idx + 1} : ${one}`);
		}
	}
	saveBlob(iFileName: string, iBlob: string) {
		//console.log(`dbg014: iFileName: ${iFileName}`);
		this.fNB.push({ fName: iFileName, fBlob: iBlob });
	}
	flushBlobs() {
		this.fNB = [];
	}
	getBlobs(): tBlob[] {
		return this.fNB;
	}
	createZip(): string {
		const rZip = 'this is a zip';
		return rZip;
	}
}

function sysBlob(): SysBlob {
	const rInst = new SysBlob();
	return rInst;
}
//const sBlob = sysBlob();

export type { tBlob, SysBlob };
//export { sBlob };
export { sysBlob };
