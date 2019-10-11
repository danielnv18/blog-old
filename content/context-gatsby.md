---
author: Daniel Noyola
layout: post
title: 'Using React Context API in Gatsby'
image: img/forest.jpg
date: 2019-10-10T02:00:00.000Z
draft: false
tags:
  - gatsby
  - react
  - js
  - context
---

The Context API is not a redux replacement but it works very well for saving the application state. It helps a lot if you want to share state between multiple components that are not at the same level.

In n regular React applicacion, you normally have a common entry point, an `App.js` or an `index.js`.
In case of gatsby, you need to edit the file `gatsby-browser.js`.

```js
import React from 'react';
import { SiteContextProvider } from './src/context/SiteContext';
const wrapRootElement = ({ element }) => <SiteContextProvider>{element}</SiteContextProvider>;

export { wrapRootElement };
```

In that case, `SiteContext` would be the context file that contains the state of your site.

```js
import React from 'react';

const defaultState = {};
const SiteContext = React.createContext(defaultState);

const SiteContextProvider = ({ children }) => {
  return <SiteContext.Provider>{children}</SiteContext.Provider>;
};

export default SiteContext;

export { SiteContextProvider };
```
