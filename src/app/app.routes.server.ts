import { RenderMode, ServerRoute } from '@angular/ssr';
import { serverRoutingConfig } from '../server-routing-config';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
    ...serverRoutingConfig.routes['customer-data/:id']
  }
];
