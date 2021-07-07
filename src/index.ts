import axios from 'axios'

import { initialiseEnvironment, CLIENT_ID, getBearerToken } from './lib/authentication.js';
initialiseEnvironment();

import { initialiseServer } from './server.js'
initialiseServer();

import { createDefaultCommands } from './commands/commands.js';

createDefaultCommands();