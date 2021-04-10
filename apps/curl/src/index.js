export default {
  name: 'curl',
  handler: async (shell, args) => {

    try {
      const res = await fetch(args[0]);
      const text = await res.text();
      await shell.print(text);
    } catch (e) {
      const err = shell.shell.chalk.red;
      shell.printLine(err(e.message));
    }
  }
}
