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

// 	hashMap	= require('eventhashmap');

// module.exports = function nameSpace(splitChar) {
// 	splitChar = splitChar || '.';
	
// 	//Root level of namespace
// 	var me = hashMap();

// 	var createNamespace = function (str, value) {
// 		var level = me,
// 			arr = str.split(splitChar);

// 		//Traverse namespace string
// 		return _(arr).map(function (s, i) {
// 			if (i < arr.length - 1) {
// 				//Traverse down the namespace objects
// 				level = level[s] = (level[s] || hashMap());
// 			} else {
// 			   //if leaf object and setValue is true then set value on namespace hashmap
// 				level[s] = value;
// 			}

// 			//Return the current level of namespace
// 			return level;
// 		}).last();
// 	};

// 	var getNamespace = function (str) {
// 		var level = me,
// 			arr = str.split(splitChar);

// 		//Traverse namespace string
// 		return _(arr).map(function (s, i) {
// 			//Traverse down the namespace objects and return it
// 			level = level[s] || hashMap();
// 			return level;
// 		}).last();
// 	};

// 	me._on('new', function (key, value) {
// 		//Must suspend event or infinite loop is imminent!
// 		me._suspendEvents(function () {
// 			//Create the "real" namespace of nested hashmaps
// 			createNamespace(key, value);

// 			//Delete the "fake" key
// 			delete me[key];

// 			//Resume events on next tick
// 			me._resumeEvents();
// 		});
// 	});

// 	me._on('deleted', function (key, value) {
// 		//Must suspend event or infinite loop is imminent!
// 		me._suspendEvents(function () {
// 			var arr = key.slice(splitChar),
// 			preKey = arr.slice(0, arr.length - 1),
// 			postKey = arr.slice(arr.length - 1, arr.length),
// 			o = getNamespace(preKey);

// 			//Delete last key in
// 			delete o[postKey];

// 			//Resume events on next tick
// 			me._resumeEvents();
// 		});
// 	});

// 	Object.defineProperty(me, '_done', {
// 		enumerable: false,
// 		value: function (cb) {
// 			setTimeout(function () {
// 				cb();
// 			}, 10)
// 		}
// 	});

// 	return me;
// };