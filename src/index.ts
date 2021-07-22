import './util/env.js'

import { initialiseServer } from './server.js'
initialiseServer();

import { registerDefaultCommands } from './commands/commands.js';

registerDefaultCommands();
