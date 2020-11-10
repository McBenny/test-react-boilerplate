/**
 * Asynchronously loads the component for ScoreSheet
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
