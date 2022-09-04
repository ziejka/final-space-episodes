# Final space API usage

## Description
I have chosen Next.js as a framework of choice. It allows me of rapid iteration and
out of the box backend integration and tailwind as the fastest way of styling that kind of app. 

As I've expected multiple call to external API I've implemented simple in-memory cache using `memory-cache` library.

When users enters the page, it's get server rendered response with information about Loading episodes, this can be improved
by better components' segregation. 

Using `useEffect` depended on the `page` we allow to fetch next pages. As improvement, we could add paramURL to the homepage
with `page` itself.

What I didn't have time for: 
- add test to the application
- better error handling on both backend and fronted
- limiting backend call's for fetching images as now each render of `CharacterImage` makes a call to the backend,
  having Map of `[characterID, imgURL]` and storing already fetch url would be one of possible simple solution
- creating storybook would be worth considering not to be depended on of the data fetch while styling the components 

## Scripts

```bash
yarn dev
```