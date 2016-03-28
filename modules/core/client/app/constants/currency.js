(function(angular, undefined) {
  angular.module("walleApp.constants")

.constant("currency", {
	"bitcoin": {
		"name": "bitcoin",
		"decimal": 8,
		"description": "Bitcoin"
	},
	"litecoin": {
		"name": "litecoin",
		"decimal": 8,
		"description": "Litecoin"
	},
	"dogecoin": {
		"name": "dogecoin",
		"decimal": 8,
		"description": "Dogecoin"
	}
})

.constant("currencies", [
	{
		"name": "bitcoin",
		"decimal": 8,
		"description": "Bitcoin"
	},
	{
		"name": "litecoin",
		"decimal": 8,
		"description": "Litecoin"
	},
	{
		"name": "dogecoin",
		"decimal": 8,
		"description": "Dogecoin"
	}
])

;
})(angular);