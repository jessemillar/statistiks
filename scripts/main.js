var myDefaultFill = '#ffffff'
var myBorderColor = '#ffffff'
var myHighlightFill = '#ff3c99'

var map = new Datamap({
	element: document.getElementById('map_data'),
	projection: 'mercator',
	fills: {
		defaultFill: myDefaultFill,
		myBorderColor: myBorderColor,
		myHighlightFill: myHighlightFill
	},
	geographyConfig: {
		borderWidth: 2,
		borderColor: myBorderColor,
		highlightFillColor: myHighlightFill,
		highlightBorderColor: myHighlightFill,
		highlightBorderWidth: 3
	}
})