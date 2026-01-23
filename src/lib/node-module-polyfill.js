export const createRequire = () => {
  return (id) => {
    if (id === 'os') {
      return { 
        release: () => 'browser',
        platform: () => 'browser',
        type: () => 'browser'
      };
    }
    return {};
  };
};
