export default {
  name: 'curl',
  handler: (shell, args) => {
    const err = shell.shell.chalk.red;
    const green = shell.shell.chalk.green;
    const exeText = r => r.text();
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
      .then(exeText)
      .then(shell.print)
      .then(printEmptyLine)
  }
}
