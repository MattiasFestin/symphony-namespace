'use strict';

var _		= require('lodash');

module.exports = function (splitChar) {
	splitChar = splitChar || '.';

	var createNamespace = function (hm, str, value) {
			var level = hm,
				arr = str.split(splitChar);

			//Delete the "fake" key
			delete hm[str];

			//Traverse namespace string
			_.forEach(arr, function (s, i) {
				if (i < arr.length - 1) {
					//Traverse down the namespace objects
					level = level[s] = level[s] || {};
				} else {
				   //if leaf object and setValue is true then set value on namespace hashmap
					level[s] = value;
				}

				//Return the current level of namespace
				// return level;
			});

			return level;
		},
		getNamespace = function (hm, str) {
			var level = hm,
				arr = str.split(splitChar);

			//Traverse namespace string
			_.forEach(arr, function (s, i) {
				//Traverse down the namespace objects and return it
				level = level[s] || {};
				
			});

			return level;
		},
		deleteNamespace = function (hm, str) {
			var arr = str.split(splitChar),
				preKey = arr.slice(0, arr.length - 1).join(splitChar),
				postKey = arr.slice(arr.length - 1, arr.length),
				o = preKey.length ? getNamespace(hm, preKey) : hm;

			//Delete last key in
			delete o[postKey];
		};

	//The object that holds all values
	var _hm = {};

	var fn = function (key, value, force) {
		force = force || false;

		return (force || value !== undefined) ?
			createNamespace(_hm, key, value) :
			getNamespace(_hm, key);
	};

	fn.delete = function (key) {
		deleteNamespace(_hm, key);
	};

	return fn;
};