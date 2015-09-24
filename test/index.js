var folderCreationInformation = require('../index.js');

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
