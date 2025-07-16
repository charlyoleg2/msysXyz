// sysBlob.ts of systemix

interface tBlob {
	fName: string;
	fBlob: string;
}

class SysBlob {
	static instance: SysBlob;
	static fNB: tBlob[];
	constructor() {
		console.log('dbg012: instanciate singleton sBlob start');
		if (SysBlob.instance) {
			return SysBlob.instance;
		}
		SysBlob.fNB = [];
		SysBlob.instance = this;
		console.log('dbg018: instanciate singleton sBlob end');
	}
	getNames(): string[] {
		const rNames = SysBlob.fNB.map((iblob) => iblob.fName);
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
		SysBlob.fNB.push({ fName: iFileName, fBlob: iBlob });
	}
	flushBlobs() {
		SysBlob.fNB = [];
	}
	getBlobs(): tBlob[] {
		return SysBlob.fNB;
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
const sBlob = sysBlob();

export type { tBlob, SysBlob };
export { sBlob };
