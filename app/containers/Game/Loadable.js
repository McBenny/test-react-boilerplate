/**
 * Asynchronously loads the component for Game
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
