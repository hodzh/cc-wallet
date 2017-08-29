import { ConfigLoader } from './loader';

export const CONFIG: any = {};

loadConfig();

function loadConfig() {
  let loader = new ConfigLoader();
  loader.load(CONFIG);
}
