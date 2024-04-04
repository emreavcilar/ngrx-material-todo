/* 

I prefer to use barrel files for exports. 
With that approach you don't need to address the exact folder 

Also there is a barrel file inside todo/index.ts 

By doing this, anywhere else in the application where you need to access 
anything related to the store, you can import from your store folder 
directly, and it will automatically have access to all the actions, 
reducers, effects, and selectors you've defined and exported through your 
index.ts files. This approach keeps your imports clean and your architecture scalable.

import { ...anything related to store } from './store';

*/


export * from './todo';
// export others if neededs