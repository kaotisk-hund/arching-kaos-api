# Arching Kaos API
An API for listing and uploading shows.

## Description

With this API, we can upload a mix of music or a show providing an IPFS link to the API, an artist's name and a title. The API starts the process of downloading the mix/show through its IPFS gateway while a DAT archive is created for it. By the end of the download, the mix/show gets saved to a JSON list with all its information (metadata and links) and it also gets posted to Scuttlebutt protocol as a post on the channel `#arching-kaos-radio-mixes`.

## Install with podman 

### Configure it

Adjust sed commands for your home folder accordingly editing the `./configure.sh` file.
`sed` needs to be run twice cause it's twice on `install.sh`.

You 'll need also to escape the `/` in your path and have no trailing slash `/` in the end of it.

Run `./configure.sh`

### Install it

Run `./install.sh` to build the podman image and start it.

You have now the api running on `http://127.0.0.1:3001` [visit](http://127.0.0.1:3001).

## Install with npm

After cloning the repo cd into it and run:
`npm i`
or
`npm -g i`

### Set up

Try running the following to setup directories:
`cd tools && node installer.js`

### Run it

Edit `./run-api.sh` to fit it on your needs and then run it or put it on a cronjob.

## API Routes

* `/` - Interface for uploading a new show
* `/shows` - Returns the current show list in JSON
* `/show/add/:ipfs/:artist/:title` - Adds a show with the :ipfs for the IPFS has (no /ipfs/ is needed), :artist for the name of the Artist and :title for the title of the show
* `/register/:cjdns` - Adds a CJDNS IP to the `ipList.json` which whitelists IPs in order to be able to upload mixtapes to the API.
* `/server/register/:cjdns/:ipfs/:hostname/:ssb` - Adds a server on `servers.json`.

All routes are `GET`

## License
MIT
