export function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 2, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 3, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 4, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 5, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 6, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 7, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 8, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 9, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' },
        { id: 10, name: 'João Lucas Gardenberg', username: 'joaogardenberg', type: 'Médico' }
      ]);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}
