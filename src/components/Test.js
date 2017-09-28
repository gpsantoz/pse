import React from 'react';

class Test extends React.Component {
	Filters = {
		getPixels: function(img) {
			var c, ctx;
			if (img.getContext) {
				c = img;
				try {
					ctx = c.getContext('2d');
				} catch (e) {}
			}
			if (!ctx) {
				c = this.getCanvas(img.width, img.height);
				ctx = c.getContext('2d');
				ctx.drawImage(img, 0, 0);
			}
			return ctx.getImageData(0, 0, c.width, c.height);
		},

		getCanvas: function(w, h) {
			var c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			return c;
		},

		filterImage: function(filter, image, var_args) {
			var args = [this.getPixels(image)];
			for (var i = 2; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			return filter.apply(null, args);
		},

		grayscale: function(pixels, args) {
			var d = pixels.data;
			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i + 1];
				var b = d[i + 2];
				// CIE luminance for the RGB
				var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				d[i] = d[i + 1] = d[i + 2] = v;
			}
			return pixels;
		},

		runFilter: function(id, filter, arg1, arg2, arg3) {
			let img = document.getElementById('orig');
			var c = document.getElementById(id);
			var s = c.previousSibling.style;
			var b = c.parentNode.getElementsByTagName('button')[0];
			if (b.originalText == null) {
				b.originalText = b.textContent;
			}
			if (s.display == 'none') {
				s.display = 'inline';
				c.style.display = 'none';
				b.textContent = b.originalText;
			} else {
				var idata = this.filterImage(filter, img, arg1, arg2, arg3);
				c.width = idata.width;
				c.height = idata.height;
				var ctx = c.getContext('2d');
				ctx.putImageData(idata, 0, 0);
				s.display = 'none';
				c.style.display = 'inline';
				b.textContent = 'Restore original image';
			}
		}
	};

	componentDidMount() {}
	render() {
		return (
			<div className="container">
				<figure>
					<canvas
						id="orig"
						src="demo_small.png"
						width="600"
						height="337"
					/>

					<button
						onclick={this.Filters.runFilter(
							'grayscale',
							this.Filters.grayscale
						)}
					>
						Grayscale the image
					</button>
				</figure>
			</div>
		);
	}
}

export default Test;
