# Crossmint challenge
- Each candidate will own a candidateId 
- Candidates will go through different stages
- Each stage has a goal map (CrossmintService.getGoal)
- Each goal map has Polyanets/Soloons/Comeths or spaces on each position
- Astral Objects have to be created with Crossmint API into candidate map for the current stage

## Crossmint API Bugs ##
Once in a while Crossmint API starts failing for some requests, because of this every POST Crossmint request has a (one) retry attempt with 5 seconds delay
Example error: 
- message: 'Cannot call `candidates.findOne()` before initial connection is complete if `bufferCommands = false`. Make sure you `await mongoose.connect()` if you have `bufferCommands = false`.'

- Even though the Crossmint API returns 200 code sometimes the AstralObject isn't created
- A position that doesn't exist in the map can be deleted and that will generate a "SPACE" on it causing the map to be invalidated. There is no "reset" endpoint to start over when this happens
- If a position is created with "wrong" params: a cometh with direction "purple" and then the position is invalidated and can't be deleted or modified until after trying multple time the same thing, it does (???????)
    - e.g: delete or post: 
    `{
            "error": true,
            "message": "Cannot set property '24' of undefined"
    }` 

## SCRIPT ##
This project uses Node with Typescript 
`npm run start`: Run the script
`npm run test`: Run tests with jest
`npm run lint`: Check if code fulfills linter rules

## TODOS ##
- Add delay and retries for crossmint api calls
- Add tests for more cases
- Add unit tests for every remaining class
- Add config file to read candidate id instead of hardcoding it
- Add logger
