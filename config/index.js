'use strict';

import nconf from 'nconf'
import * as path from "path";

export default nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json')});

