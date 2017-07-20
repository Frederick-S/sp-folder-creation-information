# sp-folder-creation-information

[![Greenkeeper badge](https://badges.greenkeeper.io/Frederick-S/sp-folder-creation-information.svg)](https://greenkeeper.io/)
Create a new SharePoint folder creation information.

## Installation
```
npm install sp-folder-creation-information --save
```

## Usage
```js
var folderCreationInformation = require('sp-folder-creation-information');

var clientContext = SP.ClientContext.get_current();
var web = clientContext.get_web();
var list = web.get_lists().getByTitle('list title');

var listItemCreationInformation = folderCreationInformation('folder name'); // Or folderCreationInformation('folder name', 'parent folder url')
var listItem = list.addItem(listItemCreationInformation);
listItem.update();

clientContext.load(listItem);
clientContext.executeQueryAsync(function () {
    // Do something
}, function (sender, args) {
    // Error
});
```

## License
MIT.
