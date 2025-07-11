// sysBlob.ts of systemix

interface tBlob {
	fName: string;
	fBlob: string;
}

class sysBlob {
	fBlob: tBlob[];
	constructor() {
		this.fBlob = [];
	}
	saveBlob(iFileName: string, iBlob: string) {
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

export { sBlob };
