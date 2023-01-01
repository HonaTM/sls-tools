const {getFilePath} = require("../../io/fs-helper");
const fs = require("fs");
const {CONSOLE_LOG} = require("../../logger/logger");
const {currentDateWithTime} = require("../../utils/data-utils");

const fullExport = (configuration) => {
    CONSOLE_LOG.info(`Zipping whole content in ${configuration.tempDir} to ${configuration.uuApp.name}_${currentDateWithTime()}_full_export.zip`);
    configuration.bookkit.fullExportFilePath = getFilePath(configuration.tempDir, `${configuration.uuApp.name}_${currentDateWithTime()}_full_export.zip`);
    fs.readdirSync(configuration.tempDir).forEach(file => {
        CONSOLE_LOG.info(`Adding ${file} to ${configuration.bookkit.fullExportFilePath}`);
        zipContent.addLocalFolder(getFilePath(configuration.tempDir, file), file);
    });

    zipContent.writeZip(configuration.bookkit.fullExportFilePath);
}



module.exports = {
    fullExport
}