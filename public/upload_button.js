'use strict'
const e = React.createElement;

class UploadButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = { uploaded: false }
	}

//  componentWillMount() {
//    this.getData()
//  }

	render() {
		if (this.state.uploaded) {
			return 'Success!';
		}

		return e(
			'button',
			{ onClick: ()=> {
				function getData(link) {
					function showMe(m) {
						// console.log(m)
					}

					// create a new XMLHttpRequest
					var xhr = new XMLHttpRequest()

					// get a callback when the server responds
					xhr.addEventListener('load', () => {
						// update the state of the component with the result here
						showMe(xhr.responseText)
					})
					// open the request with the verb and the url
					xhr.open('GET', link)
					// send the request
					xhr.send()
				}
				var artist = document.querySelector('#artist').value;
				var title = document.querySelector('#title').value;
				var ipfs = document.querySelector('#ipfs').value;
				// console.log(artist);
				getData('/show/add/'+ipfs+'/'+artist+'/'+title);
				this.setState({ uploaded: true})
			}
			},
			'Upload'
		);
	}
}

const domContainer = document.querySelector('#upload_button_container');
ReactDOM.render(e(UploadButton), domContainer);
