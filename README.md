msysXyz
=======


Presentation
------------

*msysXyz* is the top-monorepo for the system-library *sysXyz*, which contains the parameters of the system *Xyz*.

This monorepo contains the following *javascript* package:

1. systemix: the *systemix* library with its helper functions
2. systemui: the helper library for making sysXyz-ui
3. systemcli: the helper library for making sysXyz-cli
4. sysXyz: a *systemix* library for managing the system parameters
5. sysXyz-cli: the cli of sysXyz
6. sysXyz-ui: the web-ui of sysXyz
7. sysXyz-uis: the web-server of sysXyz-ui

This repo is a typical systemix-repository using [systemix](https://charlyoleg2.github.io/systemix/).
The systemix-library and its associated UI and CLI are published as *npm-packages*.
The UI is also available on the github-page.


Links
-----

- [sysXyz-ui](https://charlyoleg2.github.io/msysXyz/) : public instance of the UI
- [sources](https://github.com/charlyoleg2/msysXyz) : git-repository
- [pkg](https://www.npmjs.com/package/sysXyz) : sysXyz as npm-package
- [pkg-cli](https://www.npmjs.com/package/sysXyz-cli) : sysXyz-cli as npm-package
- [pkg-uis](https://www.npmjs.com/package/sysXyz-uis) : sysXyz-uis as npm-package


Usage for System-architects
---------------------------

Parametrize and generate your 3D-files with the online-app:

[https://charlyoleg2.github.io/msysXyz/](https://charlyoleg2.github.io/msysXyz/)

Or use the UI locally:

```bash
npx sysXyz-uis
```

Or use the command-line-interface (CLI):

```bash
npx sysXyz-cli
```

Getting started for Dev
-----------------------

```bash
git clone https://github.com/charlyoleg2/msysXyz
cd msysXyz
npm i
npm run ci
npm run preview
```

Other useful commands:
```bash
npm run clean
npm run ls-workspaces
npm -w sysXyz run check
npm -w sysXyz run build
npm -w sysXyz-ui run dev
```

Prerequisite
------------

- [node](https://nodejs.org) version 22.0.0 or higher
- [npm](https://docs.npmjs.com/cli/v11/commands/npm) version 11.0.0 or higher


Publish a new release
---------------------

```bash
npm run versions
git commit -am 'increment sub versions'
npm version patch
git push
git push origin v0.5.6
```
