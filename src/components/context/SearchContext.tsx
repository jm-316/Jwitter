import { createContext, useState } from 'react';
import { AuthProps, SearchContextProps } from '../../type';

const defaultValue: SearchContextProps = {
  tags: [],
  setTags: () => {},
};

const SearchContext = createContext<SearchContextProps>(defaultValue);

export const SearchContextProvider = ({ children }: AuthProps) => {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <SearchContext.Provider value={{ tags, setTags }}>
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContext;
