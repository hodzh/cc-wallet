import { ConfigLoader } from './loader';

export const CONFIG = {};

loadConfig();

function loadConfig() {
  let loader = new ConfigLoader();
  loader.load(CONFIG);
}
