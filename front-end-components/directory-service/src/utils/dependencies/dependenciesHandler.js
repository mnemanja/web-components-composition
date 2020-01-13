const useLocalMui = process.env.NODE_ENV === 'development';

/**
 * @description Using the dynamic imports we can reduce the bundle by chunking out and excluding
 * the dev dependencies
 * @param elements
 * @param uiLibrary
 * @returns {Promise<{} & any>}
 */
export const mui = async (elements, uiLibrary) => {
  let localUILib;

  if (useLocalMui) {
    try {
      localUILib = await import('../dependencies/mui.dependency');
    } catch (err) {
      console.error(err);
    }
  }

  const el = elements.map((element) => {
    return {
      [element]: useLocalMui ? localUILib.mui[element] : uiLibrary && uiLibrary[element],
    };
  });

  return Object.assign({}, ...el);
};
