import './util/env.js'

import { initialiseServer } from './server.js'
initialiseServer();

import { registerCommands } from './commands/commands.js';

registerCommands();

export { };