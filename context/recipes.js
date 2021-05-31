import { createContext, useContext } from 'react';

const RecipesContext = createContext();

export function RecipesWrapper({ children, recipes }) {
  let sharedState = recipes

  return (
    <RecipesContext.Provider value={sharedState}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipesContext() {
  return useContext(RecipesContext);
}