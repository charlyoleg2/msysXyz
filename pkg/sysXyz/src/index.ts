// index.ts
// export top-level component-definition and parameters

// system sysXyz
export { compXyzSDef } from './sysXyz/compXyz';
export { compXyzIn } from './sysXyz/sysXyz';

// system sysAbc
//export { compAbcSDef } from './sysAbc/compAbc';
//export { compAbcIn } from './sysAbc/sysAbc';

// workaround for singleton issue
export { sBlob } from 'systemix';
