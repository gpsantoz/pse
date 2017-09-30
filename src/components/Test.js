import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import _ from 'lodash';

if (!window.Float32Array) Float32Array = Array;

class Test extends React.Component {
	Filters = {
		tmpCtx: document.createElement('canvas').getContext('2d'),

		getPixels: function(img) {
			let c, ctx;
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
			let c = document.createElement('canvas');
			c.width = w;
			c.height = h;
			return c;
		},

		createImageData: function(w, h) {
			return this.tmpCtx.createImageData(w, h);
		},

		filterImage: function(filter, image, var_args) {
			let args = [this.getPixels(image)];
			for (let i = 2; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			return filter.apply(this, args);
		},

		grayscale: function(pixels, args) {
			let d = pixels.data;
			for (let i = 0; i < d.length; i += 4) {
				let r = d[i];
				let g = d[i + 1];
				let b = d[i + 2];
				// CIE luminance for the RGB
				let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
				d[i] = d[i + 1] = d[i + 2] = v;
			}
			return pixels;
		},

		getIntensity: function(r, g, b) {
			return 0.2126 * r + 0.7152 * g + 0.0722 * b;
		},

		// calculateHistogram: function(pixels, args) {
		// 	let d = pixels.data;

		// 	let first = this.getIntensity(d[0], d[1], d[2]);

		// 	let data = [];
		// 	const data = [
		// 		{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
		// 		{ name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
		// 		{ name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
		// 		{ name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
		// 		{ name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
		// 		{ name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
		// 		{ name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
		// 	];

		// 	for (let i = 4; i < d.length; i += 4) {
		// 		let r = d[i];
		// 		let g = d[i + 1];
		// 		let b = d[i + 2];
		// 		// CIE luminance for the RGB
		// 		let v = this.getIntensity(r, g, b);
		// 		d[i] = d[i + 1] = d[i + 2] = v;
		// 	}
		// 	return pixels;
		// },

		brightness: function(pixels, adjustment) {
			let d = pixels.data;
			for (let i = 0; i < d.length; i += 4) {
				d[i] += adjustment;
				d[i + 1] += adjustment;
				d[i + 2] += adjustment;
			}
			return pixels;
		},

		invert: function(pixels) {
			let d = pixels.data;
			for (let i = 0; i < d.length; i += 4) {
				d[i] = 255 - d[i];
				d[i + 1] = 255 - d[i + 1];
				d[i + 2] = 255 - d[i + 2];
			}
			return pixels;
		},

		threshold: function(pixels, threshold) {
			let d = pixels.data;
			for (let i = 0; i < d.length; i += 4) {
				let r = d[i];
				let g = d[i + 1];
				let b = d[i + 2];
				let v =
					0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
				d[i] = d[i + 1] = d[i + 2] = v;
			}
			return pixels;
		},

		convolute: function(pixels, weights, opaque) {
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);

			var src = pixels.data;
			var sw = pixels.width;
			var sh = pixels.height;

			var w = sw;
			var h = sh;
			var output = this.createImageData(w, h);
			var dst = output.data;

			var alphaFac = opaque ? 1 : 0;

			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					var sy = y;
					var sx = x;
					var dstOff = (y * w + x) * 4;
					var r = 0,
						g = 0,
						b = 0,
						a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = Math.min(
								sh - 1,
								Math.max(0, sy + cy - halfSide)
							);
							var scx = Math.min(
								sw - 1,
								Math.max(0, sx + cx - halfSide)
							);
							var srcOff = (scy * sw + scx) * 4;
							var wt = weights[cy * side + cx];
							r += src[srcOff] * wt;
							g += src[srcOff + 1] * wt;
							b += src[srcOff + 2] * wt;
							a += src[srcOff + 3] * wt;
						}
					}
					dst[dstOff] = r;
					dst[dstOff + 1] = g;
					dst[dstOff + 2] = b;
					dst[dstOff + 3] = a + alphaFac * (255 - a);
				}
			}
			return output;
		},

		convoluteFloat32: function(pixels, weights, opaque) {
			var side = Math.round(Math.sqrt(weights.length));
			var halfSide = Math.floor(side / 2);

			var src = pixels.data;
			var sw = pixels.width;
			var sh = pixels.height;

			var w = sw;
			var h = sh;
			var output = {
				width: w,
				height: h,
				data: new Float32Array(w * h * 4)
			};
			var dst = output.data;

			var alphaFac = opaque ? 1 : 0;

			for (var y = 0; y < h; y++) {
				for (var x = 0; x < w; x++) {
					var sy = y;
					var sx = x;
					var dstOff = (y * w + x) * 4;
					var r = 0,
						g = 0,
						b = 0,
						a = 0;
					for (var cy = 0; cy < side; cy++) {
						for (var cx = 0; cx < side; cx++) {
							var scy = Math.min(
								sh - 1,
								Math.max(0, sy + cy - halfSide)
							);
							var scx = Math.min(
								sw - 1,
								Math.max(0, sx + cx - halfSide)
							);
							var srcOff = (scy * sw + scx) * 4;
							var wt = weights[cy * side + cx];
							r += src[srcOff] * wt;
							g += src[srcOff + 1] * wt;
							b += src[srcOff + 2] * wt;
							a += src[srcOff + 3] * wt;
						}
					}
					dst[dstOff] = r;
					dst[dstOff + 1] = g;
					dst[dstOff + 2] = b;
					dst[dstOff + 3] = a + alphaFac * (255 - a);
				}
			}
			return output;
		},

		createCanvas: function(filterName) {
			let figureArea = document.getElementById('figure-area');
			let canvas = document.createElement('CANVAS');
			canvas.id = filterName;
			canvas.style.display = 'none';
			figureArea.appendChild(canvas);
			return canvas;
		},

		deleteCanvas: function(filterName) {
			let figureArea = document.getElementById('figure-area');
			let canvas = document.getElementById(filterName);
			figureArea.removeChild(canvas);
		},

		runFilter: function(id, filter, arg1, arg2, arg3) {
			let img = document.getElementById('orig');
			let c = document.getElementById(id);
			if (!c) c = this.createCanvas(id);
			let s = c.previousSibling.style;
			let b = document.getElementById(`${id}-btn`);
			if (b.originalText == null) {
				b.originalText = b.textContent;
			}
			if (s.display === 'none') {
				s.display = 'inline';
				this.deleteCanvas(id);
				b.textContent = b.originalText;
			} else {
				let idata = this.filterImage(filter, img, arg1, arg2, arg3);
				c.width = idata.width;
				c.height = idata.height;
				let ctx = c.getContext('2d');
				ctx.putImageData(idata, 0, 0);
				s.display = 'none';
				c.style.display = 'inline';
				b.textContent = 'Desfazer';
			}
		},

		runSobel: function() {
			this.runFilter('sobel', function(px) {
				px = this.grayscale(px);
				var vertical = this.convoluteFloat32(px, [
					-1,
					-2,
					-1,
					0,
					0,
					0,
					1,
					2,
					1
				]);
				var horizontal = this.convoluteFloat32(px, [
					-1,
					0,
					1,
					-2,
					0,
					2,
					-1,
					0,
					1
				]);
				var id = this.createImageData(vertical.width, vertical.height);
				for (var i = 0; i < id.data.length; i += 4) {
					var v = Math.abs(vertical.data[i]);
					id.data[i] = v;
					var h = Math.abs(horizontal.data[i]);
					id.data[i + 1] = h;
					id.data[i + 2] = (v + h) / 4;
					id.data[i + 3] = 255;
				}
				return id;
			});
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
				{ name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
				{ name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
				{ name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
				{ name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
				{ name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
				{ name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
			]
		};
	}

	renderButton(functionName, args) {
		return (
			<button
				key={`${functionName}-btn`}
				id={`${functionName}-btn`}
				className="waves-effect waves-light btn"
				onClick={() => {
					if (!args)
						this.Filters.runFilter(
							functionName,
							this.Filters[functionName]
						);

					this.Filters.runFilter(
						functionName,
						this.Filters[functionName],
						...args
					);
				}}
			>
				{functionName}
			</button>
		);
	}

	render() {
		return (
			<div className="container">
				<figure id="figure-area">
					<img
						className="responsive-img"
						id="orig"
						src="demo_small.png"
						alt="image"
					/>
				</figure>

				<div className="divider" />

				<div className="section">
					<button
						id={'grayscale-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runFilter(
								'grayscale',
								this.Filters.grayscale
							);
						}}
					>
						Grayscale
					</button>
					<button
						id={'invert-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runFilter(
								'invert',
								this.Filters.invert
							);
						}}
					>
						Invert
					</button>
					<button
						id={'brightness-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runFilter(
								'brightness',
								this.Filters.brightness,
								40
							);
						}}
					>
						Brightness
					</button>
					<button
						id={'threshold-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runFilter(
								'threshold',
								this.Filters.threshold,
								128
							);
						}}
					>
						Threshold
					</button>
					<button
						id={'sharpen-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runFilter(
								'sharpen',
								this.Filters.convolute,
								[0, -1, 0, -1, 5, -1, 0, -1, 0]
							);
						}}
					>
						Sharpen
					</button>
					<button
						id={'blurC-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runFilter(
								'blurC',
								this.Filters.convolute,
								[
									1 / 9,
									1 / 9,
									1 / 9,
									1 / 9,
									1 / 9,
									1 / 9,
									1 / 9,
									1 / 9,
									1 / 9
								]
							);
						}}
					>
						Blur
					</button>
					<button
						id={'sobel-btn'}
						className="waves-effect waves-light btn"
						onClick={() => {
							this.Filters.runSobel();
						}}
					>
						Sobel
					</button>
				</div>

				<div className="section">
					<LineChart width={600} height={300} data={this.state.data}>
						<Line type="monotone" dataKey="uv" stroke="#8884d8" />
						<CartesianGrid stroke="#ccc" />
						<XAxis dataKey="name" />
						<YAxis />
					</LineChart>
				</div>
			</div>
		);
	}
}

export default Test;
