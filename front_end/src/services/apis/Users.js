export function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = 5;

      for (let i = 0; i < random; i++) {
        objects.push({
          id: `${new Date().getTime()}${Math.floor(Math.random() * 10001)}`,
          name: `João Lucas Gardenberg ${i}`,
          username: `johnny${i}`,
          type: 'Médico(a)'
        });
      }

      resolve(objects);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}

export function createUser(attributes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dup = Object.assign({}, attributes);
      dup.id = `${new Date().getTime()}${Math.floor(Math.random() * 10001)}`;
      resolve(dup);
    });
  }, 100 + Math.floor(Math.random() * 2001));
}

export function updateUser(attributes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(attributes);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}

export function destroyUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id);
    }, 100 + Math.floor(Math.random() * 2001));
  });
}
