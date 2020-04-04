# MyMDb

This project is the back end for the [MyMDb application](https://mymdb-front-mpl.herokuapp.com/). Running [here](https://mymdb-mpl.herokuapp.com/).

## Assumptions​

- Database isn't a requirement for this project.

## Architecture​

There are only two layers: presentation and network.

- The presentation layer builds the responses based on the input from the requets made by the client.
- The network layer provides the data to the presentation layer.

The source code is concentrated in the `src` folder. There is a division in 3 folders:
`controllers`, `helpers`, and `network`.

- Scripts from root: the express app, configuration loading, and logger setup.
  - The configuration is loaded from the `config` folder located outside the `src` folder. There will be find configurations for each environment (`development`, `production`, `test`). The default one is `development`. To change, use the `NODE_ENV` environment variable.
- `controllers` folder: each folder represents a resource.
  - `movies` resource: has end-points to fetch multiple movies, search, and fetch movie details.
  - `genres` resource: has one end-point to fetch all the movie genres.
  - `images` resource: has one end-point to fetch images by name (`path` for the TMDb API).
- `helpers` folder: contains a helper to create actions in an easy way; and a helper to create pre-defined errors.
- `network` folder: has scripts to request resources from the TMDb API.

## Build​ ​instructions

The TMDb API Key is **not** set inside the source code. You should define the environment variable `TMBD_KEY` with the API Key as value before starting.

The command `yarn build` builds the source code inside the `build` folder. The script `bin/www` starts a server for application built there, then use `node bin/www` to run.

For development, use `yarn dev` to run.

## Third-party​ ​libraries​

- `Express`: web application framework.
- `Axios`: HTTP client.
  - Does the requests to the TMDb API.
- `Flow`: static type checker library.
  - Avoids bugs and improve the code consistency.
- `Convict`: provides configuration schema and management.
  - Makes the definition of configuration for environments easier.
- `Joi`: schema definition and validation.
  - Validates the data that comes from the client.
- `Winston`: logging library.
