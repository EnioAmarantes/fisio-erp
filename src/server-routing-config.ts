export const serverRoutingConfig = {
  routes: {
    'customer-data/:id': {
      getPrerenderParams: (route: string | undefined) => {
        if (!route) {
          console.error('Route is undefined');
          return [];
        }
        const match = route.match(/customer-data\/(\d+)/);
        if (match) {
          return [{ id: match[1] }];
        }
        console.error('Route does not match expected pattern:', route);
        return [];
      },
    },
  },
};
