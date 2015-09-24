/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var folderCreationInformation = __webpack_require__(1);

	var getQueryStringParameter = function (param) {
	    var params = document.URL.split("?")[1].split("&");
	    var strParams = "";

	    for (var i = 0; i < params.length; i = i + 1) {
	        var singleParam = params[i].split("=");

	        if (singleParam[0] == param) {
	            return decodeURIComponent(singleParam[1]);
	        }
	    }
	};

	var appWebUrl = getQueryStringParameter('SPAppWebUrl');
	var clientContext = SP.ClientContext.get_current();
	var web = clientContext.get_web();
	var list = web.get_lists().getByTitle('TestList');

	var listItemCreationInformation = folderCreationInformation('Folder 1');
	var listItem = list.addItem(listItemCreationInformation);
	listItem.update();

	clientContext.load(listItem);
	clientContext.executeQueryAsync(function () {
	    listItemCreationInformation = folderCreationInformation('Folder 2', appWebUrl + '/Lists/TestList/Folder 1');
	    listItem = list.addItem(listItemCreationInformation);
	    listItem.update();

	    clientContext.load(listItem);
	    clientContext.executeQueryAsync(function () {
	        $('#message').html('Folders are createdly successfully. <a href=\'' + appWebUrl + '/Lists/TestList/Folder 1\'>Folder 1</a>.<a href=\'' + appWebUrl + '/Lists/TestList/Folder 1/Folder 2\'>Folder 1/Folder 2</a>.');
	    }, function (sender, args) {
	        $('#message').text(args.get_message());
	    });
	}, function (sender, args) {
	    $('#message').text(args.get_message());
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function (folderName, folderUrl) {
	    var listItemCreationInformation = new SP.ListItemCreationInformation();
	    listItemCreationInformation.set_underlyingObjectType(SP.FileSystemObjectType.folder);
	    listItemCreationInformation.set_leafName(folderName);

	    if (folderUrl) {
	        listItemCreationInformation.set_folderUrl(folderUrl);
	    }

	    return listItemCreationInformation;
	}


/***/ }
/******/ ]);