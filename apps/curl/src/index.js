export default {
  name: 'curl',
  handler: async (shell, [ resource ], parsed) => {

    try {
      const res = await fetch(resource);
      const text = await res.text();
      await shell.print(text);
    } catch (e) {
      const err = shell.shell.chalk.red;
      shell.printLine(err(e.message));
    }
  }
}
