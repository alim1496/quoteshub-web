import React, { useState, useContext } from 'react'

const TopicContext = React.createContext();

const { Provider } = TopicContext;

export const TopicContextProvider = ({children}) => {
  const [tab, setTab] = useState(-1);
  const updateTab = (id) => setTab(id);
  return (
    <Provider value={{tab, updateTab}}>
      {children}
    </Provider>
  )
}

export const useTopic = () => useContext(TopicContext);