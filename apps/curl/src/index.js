export default {
  name: 'curl',
  handler: async (shell, args) => {
    const err = shell.shell.chalk.red;
    try {
      if (!args[0]) {
        await shell.printLine(err('Syntax Error.'));
        return await shell.printLine('curl <url>')
      }
      const res = await fetch(args[0]);
      const text = await res.text();
      await shell.print(text);
      await shell.printLine('');
    } catch (e) {
      shell.printLine(err(e.message));
    }
  }
}
