export default {
  name: 'echo',
  type: 'command',
  exe: {
    name: 'echo',
    handler: async (shell) => {
      return shell.printLine('hello');
    }
  }
}
