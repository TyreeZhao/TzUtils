

 import Raven from 'raven-js';
 import { sentryDSN } from '../config'
 import { ENV } from '../config/env'
 
 // configure raven
 let raven = Raven
   .config(sentryDSN)
   .install()
   .setExtraContext({
     env: ENV,
   })
 
 /**
  * Tell raven to set a global user context
  * ctx set to undefined means remove
  * @param ctx {object}
  */
 export function setUserContext(ctx) {
   raven.setUserContext(ctx)
 }
 
 /**
  * @param error {Error}
  */
 export function captureErr(error) {
   // use sentry only in beta or prod env
   if (ENV === 'beta' || ENV === 'prod') {
     raven.captureException(error)
   }
 }
