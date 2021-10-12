import React, { Component } from 'react';
import '../App.css';

// -Holds data and makes call to API
class MemeGenerator extends Component {
	state = {
		topText: '',
		bottomText: '',
		randomImg: 'https://cdn.vox-cdn.com/thumbor/mVLf4wViQ6jmBGM0UcE4EFVjK5s=/0x0:1920x1080/620x413/filters:focal(391x323:697x629):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66208405/cute-success-kid-1920x1080.0.0.jpg',
		allMemeImgs: []
	};

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json())
			.then(res => {
				const { memes } = res.data;
				console.log(memes);
				this.setState({ allMemeImgs: memes });
			});
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (event) => {
		// preventDefault() method cancels the event if it is cancelable
		// Here it prevents to reload to a new page/url
		event.preventDefault();
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const randMemeImg = this.state.allMemeImgs[randNum].url;
		this.setState({ randomImg: randMemeImg });
	};

	render() {
		return (
			<div>
				<form className="meme-form" onSubmit={ this.handleSubmit }>
					<input
						type="text"
						name="topText"
						value={ this.state.topText }
						placeholder=" Top Text"
						onChange={ this.handleChange }
					/>
					<input
						type="text"
						name="bottomText"
						value={ this.state.bottomText }
						placeholder=" Last Text"
						onChange={ this.handleChange }
					/>
					<button>Gen</button>
				</form>
				<div className="meme">
					<img src={ this.state.randomImg } alt="" />
					<h2 className="top">{ this.state.topText }</h2>
					<h2 className="bottom">{ this.state.bottomText }</h2>
				</div>
			</div>
		);
	}
}

export default MemeGenerator;