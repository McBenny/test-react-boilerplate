/**
 * Asynchronously loads the component for SplashScreen
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
