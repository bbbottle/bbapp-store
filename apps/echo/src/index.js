export default {
  name: 'echo',
  handler: async (shell) => {
    return shell.printLine('hello');
  }
}
