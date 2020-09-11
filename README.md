# Arching Kaos API
An API for listing and uploading shows.

## Description

With this API, we can upload a mix of music or a show providing an IPFS link to the API, an artist's name and a title. The API starts the process of downloading the mix/show through its IPFS gateway while a DAT archive is created for it. By the end of the download, the mix/show gets saved to a JSON list with all its information (metadata and links) and it also gets posted to Scuttlebutt protocol as a post on the channel `#arching-kaos-radio-mixes`.

## Install

After cloning the repo cd into it and run:
`npm i`
or
`npm -g i`

## Set up

Try running the following to setup directories:
`cd tools && node installer.js`

## Run it

## Routes

* `/` - Interface for uploading a new show
* `/shows` - Returns the current show list in JSON
* `/show/add/:ipfs/:artist/:title` - Adds a show with the :ipfs for the IPFS has (no /ipfs/ is needed), :artist for the name of the Artist and :title for the title of the show

All routes are `GET`

## License
MIT