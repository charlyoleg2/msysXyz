// sysHelper.ts of systemix
// the library for supporting calculation of system parameters

import type {
	tVec3,
	tParamDef,
	tParametrix,
	tCompIn,
	tCompOut,
	tParamVal,
	tSubRecord,
	tSubORecord
} from './sysBase';
import type { SysBlob } from './sysBlob';
import { sBlob } from './sysBlob';

function combineParams(compDef: tParamDef, ci: tCompIn): [tParamVal, string, boolean] {
	let rLog = '';
	let rErr = false;
	// check default values from compDef
	const coPa: tParamVal = {};
	for (const pp of compDef.params) {
		const nName = pp.name;
		if (nName in coPa) {
			rLog += `err070: compDef param ${nName} is already used!\n`;
			rErr = true;
		} else {
			coPa[nName] = pp.init;
		}
	}
	// check and apply ci-params
	for (const kk in ci.pa) {
		//console.log(`dbg085: kk ${kk}`);
		//console.log(`dbg086: coPa keys: ${Object.keys(coPa)}`);
		if (kk in coPa) {
			coPa[kk] = ci.pa[kk];
		} else {
			rLog += `err081: ci-param ${kk} is not part of the component ${compDef.partName}!\n`;
			rErr = true;
		}
	}
	rLog += `info031: ${compDef.partName} ${Object.keys(coPa).length} parameters, overwritten: ${Object.keys(ci.pa).length}\n`;
	return [coPa, rLog, rErr];
}

function initCO(compDef: tParamDef, ci: tCompIn): tCompOut {
	let rLog = `Component: ${compDef.partName} :: ${ci.instName}\n`;
	const [ipa, ipaLog, iErr] = combineParams(compDef, ci);
	rLog += ipaLog;
	// prepare output
	const rCO: tCompOut = {
		partName: compDef.partName,
		instName: ci.instName,
		calcErr: iErr,
		logstr: rLog,
		pa: ipa,
		metrics: {},
		sub: {}
	};
	return rCO;
}

function enhanceInstName(instName: string): string {
	const regex = /[\\,/]/g;
	//const regex = /\//g;
	const rName = instName.replaceAll(regex, '_');
	return rName;
}

//
// ====> File generators
//

function makePxJson(pax: tParametrix): string {
	const lastModif = new Date()
		.toISOString()
		.replace(/\..*$/, '')
		.replaceAll(/[-:]/g, '')
		.replaceAll('T', '_');
	const rJson = {
		lastModif: lastModif,
		partName: pax.partName,
		pVal: pax.pxJson,
		comment: 'written by systemix'
	};
	return JSON.stringify(rJson, null, 2);
}

function makeGenStlOscad(pax: tParametrix, iN: string): string {
	const rTxt = `
echo "Generate STL of ${pax.partName}"
npx desi77-cli --design desi77/${pax.partName} --param tmp/px_${iN}.json --outDir tmp2 --outFileName ${iN}.scad write scad_3d_openscad
openscad -o tmp2/${iN}.stl tmp2/${iN}.scad
`;
	return rTxt;
}

function makeAsmStlOscad(iN: string, iO: tVec3, iP: tVec3): string {
	//console.log(`dbg095: iN: ${iN}  posZ: ${iP[2]}`);
	const rTxt = `
module ${iN} () {
	translate( [ ${iP[0]}, ${iP[1]}, ${iP[2]} ])
		rotate( [ ${iO[0]}, ${iO[1]}, ${iO[2]} ])
			import("./${iN}.stl");
}
`;
	return rTxt;
}

function makeGenStlFc(pax: tParametrix, iN: string): string {
	const rTxt = `
echo "Generate STL of ${pax.partName} with FreeCAD"
npx desi77-cli --design desi77/${pax.partName} --param tmp/px_${iN}.json --outDir tmp2 --outFileName ${iN}_fc.py write py_3d_freecad
(cd tmp2 && freecad.cmd ${iN}_fc.py ${iN}_fc)
`;
	return rTxt;
}

function makeAsmStlFc(iN: string, iO: tVec3, iP: tVec3): string {
	const rTxt = `	M${iN} = Mesh.Mesh('${iN}_fc.stl')
	# rot = App.Rotation(FreeCAD.Vector(0,0,1), ${iO[0]})
	M${iN}.Placement.Base = (App.Vector(${iP[0]}, ${iP[1]}, ${iP[2]}))
`;
	return rTxt;
}

function makeCompParamJson(partName: string, params: tParamVal): string {
	const rJson = {
		partName: partName,
		pVal: params
	};
	return JSON.stringify(rJson, null, 2);
}

//
// <==== End of File generators
//

function generateOutputFiles(
	instName: string,
	co: tCompOut,
	iOrientation: tVec3,
	iPosition: tVec3,
	iBlob: SysBlob
) {
	const eInstName = enhanceInstName(instName);
	//console.log(`dbg062: eInstName ${eInstName}`);
	iBlob.saveBlob(`log_${eInstName}.txt`, co.logstr);
	if (co.parametrix) {
		iBlob.saveBlob(`px_${eInstName}.json`, makePxJson(co.parametrix));
		iBlob.savePartialBlob('genStlOscad', makeGenStlOscad(co.parametrix, eInstName));
		iBlob.savePartialBlob('asmStlOscad', makeAsmStlOscad(eInstName, iOrientation, iPosition));
		iBlob.savePartialBlob('genStlFc', makeGenStlFc(co.parametrix, eInstName));
		iBlob.savePartialBlob('asmStlFc', makeAsmStlFc(eInstName, iOrientation, iPosition));
	}
	iBlob.saveBlob(`compp_${eInstName}.json`, makeCompParamJson(co.partName, co.pa));
	//iBlob.listNames();
}

function computeSubComp(instName: string, isub: tSubRecord): [tSubORecord, string, boolean] {
	const rSub: tSubORecord = {};
	let rLog = '';
	let rErr = false;
	for (const kk in isub) {
		const vv = isub[kk];
		if (vv.component) {
			const instN2 = `${instName}/${kk}`;
			const ci: tCompIn = { instName: instN2, pa: vv.pa, suffix: '' };
			rLog += `[csc ${kk}] ${instN2}\n`;
			try {
				const co = vv.component.compCompute(ci);
				generateOutputFiles(instN2, co, vv.orientation, vv.position, sBlob);
				rSub[kk] = co;
				rLog += co.logstr;
			} catch (eMsg) {
				rLog += `err065: Error while computing sub-component ${instN2}\n`;
				rLog += eMsg;
				rErr = true;
			}
		} else {
			rLog += `warn096: ${kk} has no assigned component!\n`;
		}
	}
	return [rSub, rLog, rErr];
}

export { combineParams, initCO, computeSubComp, generateOutputFiles };
