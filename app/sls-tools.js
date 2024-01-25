const {readConfiguration} = require("./configuration/configuration-reader");
const { exportData } = require("./command/export/main/exporter-service");
const {CONSOLE_LOG} = require("./logger/logger");
const {checkData} = require("./command/check/main/check-service");
const {dependencyManager} = require("./command/dependency-manager/main/dependeny-manager-service");
const {credentialsManager} = require("./command/credentials-manager/main/credentials-manager-service");
const {processEnvironment} = require("./configuration/helper/environment-processor");
const {promptProceedAction} = require("./utils/prompt/prompt-module");
const {dependencyManagerCommandUsage} = require("./command/dependency-manager/cli/usage");
const {checkCommandUsage} = require("./command/check/cli/usage");
const {exportCommandUsage} = require("./command/export/cli/usage");
const {compareCommandUsage} = require("./command/compare/cli/usage");
const {executeCommandUsage} = require("./command/execute/cli/usage");
const {compare} = require("./command/compare/main/compare-service");
const {credentialsManagerCommandUsage} = require("./command/credentials-manager/cli/usage");
const {execute} = require("./command/execute/main/execute-service");

const _handleCmdOperation = async (cmdArgs, commandUsage, fnc) => {
    _isCommandOnly(cmdArgs) && CONSOLE_LOG.info(commandUsage) && process.exit(0);

    let configuration = await readConfiguration(cmdArgs);
    let proceed = cmdArgs.noprompt ||
        (configuration.length === 1 && configuration[0].uuApp.shortName === "no-env") ||
        await promptProceedAction(configuration, cmdArgs);
    proceed && await processEnvironment(configuration, (environment) => fnc(cmdArgs, environment));
}

/**
 * Run export command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExport = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, exportCommandUsage, exportData);
}

/**
 * Run check command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runCheck = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, checkCommandUsage, checkData);
}

/**
 * Run dependency-manager command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runDependencyManager = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, dependencyManagerCommandUsage, dependencyManager);
}

/**
 * Run credentials-manager command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runCredentialsManager = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, credentialsManagerCommandUsage, credentialsManager);
}

/**
 * Run compare command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runCompare = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, compareCommandUsage, compare);
}

/**
 * Run execute command entry point
 *
 * @param cmdArgs
 * @returns {Promise<void>}
 */
const runExecute = async (cmdArgs) => {
    await _handleCmdOperation(cmdArgs, executeCommandUsage, execute);
}

const runHelp = (usage) => {
    CONSOLE_LOG.info(usage);
}

const _isCommandOnly = (cmdArgs) => {
    return Object.keys(cmdArgs).length === 1 && cmdArgs.command;
}

module.exports = {
    runExport,
    runCheck,
    runDependencyManager,
    runCredentialsManager,
    runHelp,
    runCompare,
    runExecute
}