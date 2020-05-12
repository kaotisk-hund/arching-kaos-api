# Arching Kaos API
An API for listing and uploading shows.


## Routes

* `/` - Interface for uploading a new show
* `/shows` - Returns the current show list in JSON
* `/show/add/:ipfs/:artist/:title` - Adds a show with the :ipfs for the IPFS has (no /ipfs/ is needed), :artist for the name of the Artist and :title for the title of the show

All routes are `GET`

## License
GPL v3 or later
