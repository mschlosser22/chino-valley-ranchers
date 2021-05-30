import { createContext, useContext } from 'react';

const NewsContext = createContext();

export function NewsWrapper({ children, news }) {
  let sharedState = news

  return (
    <NewsContext.Provider value={sharedState}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNewsContext() {
  return useContext(NewsContext);
}