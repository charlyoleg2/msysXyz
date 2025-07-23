// index.ts
// export top-level component-definition and parameters

// system sysXyz
export { compXyzSDef } from './sysXyz/compXyz';
export { compXyzIn } from './sysXyz/paramXyz';

// system sysAbc
export { compAbcSDef } from './sysAbc/compAbc';
export { compAbcIn } from './sysAbc/paramAbc';

// workaround for singleton issue
export { sBlob } from 'systemix';
