export function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = Math.floor(Math.random() * 71) + 30;

      for (let i = 0; i < random; i++) {
        objects.push({ id: i, name: `Johnny ${i}`, username: `johnny${i}`, type: 'Médico' });
      }

      resolve(objects);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}
