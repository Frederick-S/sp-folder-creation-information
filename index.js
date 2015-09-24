module.exports = function (folderName, folderUrl) {
    var listItemCreationInformation = new SP.ListItemCreationInformation();
    listItemCreationInformation.set_underlyingObjectType(SP.FileSystemObjectType.folder);
    listItemCreationInformation.set_leafName(folderName);

    if (folderUrl) {
        listItemCreationInformation.set_folderUrl(folderUrl);
    }

    return listItemCreationInformation;
}
