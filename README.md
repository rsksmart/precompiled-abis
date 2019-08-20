# Welcome to the precompiled ABIs from RSK repository. 

This repository contains the precompiled contracts used by RSK and was creted to be used by npm package modules.

# Version
Different versions of the package mentioned are required for different RSK releases.

Each version of the contracts is labeled with the following format:
<release-name> npm-version-number. Take into account that to execute a release version of RSK, the precompiled contract of the same name must be associated.
Take into account that the npm version number does not have to correspond to the version number of the RSK release, but if the name does not correspond, the precompiled contracts may not work correctly.

The versioning of precompiled contracts starts with the latest version of ORCHID release.

# How to use it. 
For the installation of these contracts you must execute in a terminal window:

         npm install rsk-precompiled-contrats@<version>

# Important note:
If the version to be installed is not defined in the command line, the version will correspond to the latest version in WASABI.

