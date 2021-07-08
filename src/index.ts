import './util/env'

import { initialiseServer } from './server.js'
initialiseServer();

import { createDefaultCommands } from './commands/commands.js';

createDefaultCommands();
