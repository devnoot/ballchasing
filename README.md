# ballchasing

This package provides a wrapper around the [ballchasing.com]() API.

## Install 
```
npm i ballchasing
```
or
```
yarn add ballchasing
```

## Quick Start 

```typescript
const {BallChasingAPI} = require("ballchasing");

const bc = new BallChasingAPI("your-api-key-here");

;(async () => {
    
    // ping the ballchasing.com api server
    // This tests connectivity to the server
    // and your API key
    const pingResponse = await bc.ping();    
    
    // get a list of maps
    const mapsResponse = await bc.getMaps();
    
    // get replays by player "noot" from Jan 1 2020 to Jan 1 2021 on map "park_p"
    // sorted ascending by the date of the replay
    const replaysResponse = await bc.listReplays({
        playerName: "noot",
        createdAfter: "2020-01-01T00:00:00-05:00",
        createdBefore: "2021-01-01T00:00:00-05:00",
        map: "park_p",
        sortBy: "replay-date",
        sortDir: "asc"
    });

})();

```

## Documentation
[https://devnoot.github.io/ballchasing/]()