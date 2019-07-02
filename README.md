# Assignment

## How to intall?

### go to terminal and type
1. `git clone git@github.com:satish876/smart-audit-assignment.git`
2. `cd smart-audit-assignment`
3. `npm install`

## Connecting to MongoDB

### I assume that you have already a running mongo server, if not please follow [this link](https://docs.mongodb.com/manual/installation/)

1. Change the database-url in `/db/mongoose.js` with your mongo servers endpoint

## Running the application
1. `npm start`

## Endpoints

### /video
1. **POST /video** - To add a new video
    
    request body
   1. `title`, required
   2. `thumbnailUrl`, required
   3. `videoUrl`, required
   4. `duration`, required
2.**GET /video/:id** - To fetch a video by id
3. DELETE /video:id - To delete a video by id


### /playlist
1. **POST /playlist** - To add a new playlist

    request body
   1. `name`, required
   2. `url`, required
   3. `videos`, required.  Its an arary of ObjectId(referring to a video) 

2. **GET /playlist/:id** - To fetch videos of a playlist
   //Returns videos objects related to a playlist

3. **DELETE /playlist/:id** - To delete a playlist by id
