import { ownScopes } from '../scoped-ownership.js';
export const ownPtcScopes = (ctx, changed, allows) => ownScopes(ctx, 'ptc', changed, allows);
