const customIndicator = function (PineJS) {
	return Promise.resolve([
	  {
		name: "Caloco",
		metainfo: {
		  _metainfoVersion: 51,

		  id: "Caloco",
		  name: "Caloco",
		  description: "Caloco",
		  shortDescription: "Caloco",

		  isCustomIndicator: true,
		  isTVScript: false,
		  isTVScriptStub: false,

		  format: {
			type: "price",
			precision: 4,
		  },

		  defaults: {
			palettes: {
			  palette_0: {
				// palette colors
				// change it to the default colors that you prefer,
				// but note that the user can change them in the Style tab
				// of indicator properties
				colors: [{ color: "#FFFF00" }, { color: "#0000FF" }],
			  },
			},
		  },
		  inputs: [],
		  plots: [
			{
			  id: "plot_0",

			  // plot type should be set to 'bar_colorer'
			  type: "bar_colorer",

			  // this is the name of the palette that is defined
			  // in 'palettes' and 'defaults.palettes' sections
			  palette: "palette_0",
			},
		  ],
		  palettes: {
			palette_0: {
			  colors: [{ name: "Color 0" }, { name: "Color 1" }],

			  // the mapping between the values that
			  // are returned by the script and palette colors
			  valToIndex: {
				100: 0,
				200: 1,
			  },
			},
		  },
		},
		constructor: function () {
		  this.main = function (context, input) {
			this._context = context;
			this._input = input;

			var valueForColor0 = 100;
			var valueForColor1 = 200;

			// perform your calculations here and return one of the constants
			// that is specified as a key in 'valToIndex' mapping
			var result =
			  (Math.random() * 100) % 2 > 1 // we randomly select one of the color values
				? valueForColor0
				: valueForColor1;

			return [result];
		  };
		},
	  },
	]);
  };

export default customIndicator;
