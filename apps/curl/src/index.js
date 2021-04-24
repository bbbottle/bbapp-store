export default {
  name: 'curl',
  handler: (shell, args) => {
    const err = shell.shell.chalk.red;
    const green = shell.shell.chalk.green;
    const getText = r => r.text();
    const printText = t => shell.print(t);
    const printEmptyLine = () => shell.printLine('');
    const showUsageAndExample = () => {
      return Promise.all([
        shell.printLine('Usage: curl <URL>'),
        shell.printLine(`Example: ${green('curl https://api.zjh.im/store/apps')}`),
      ])
    }
    const showHelpForError = (error) => {
      return Promise.all([
        shell.printLine(err(error)),
        printEmptyLine(),
        showUsageAndExample()
      ])
    }

    if (!args[0]) {
      return showHelpForError('Syntax Error.');
    }

    try {
      new URL(args[0])
    } catch (e) {
      return showHelpForError('Invalid URL.');
    }

    return fetch(args[0])
      .then(getText)
      .then(printText)
      .then(printEmptyLine)
  }
}
