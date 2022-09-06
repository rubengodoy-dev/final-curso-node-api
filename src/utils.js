import { fileURLToPath } from 'url';
import { dirname } from 'path';

const {pathname: root} = new URL('../src', import.meta.url)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default __dirname;

