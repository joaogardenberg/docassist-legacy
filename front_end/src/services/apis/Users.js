export function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = 5;
      const ids = [];

      for (let i = 1; i <= random; i++) {
        const id = i < random ? `${new Date().getTime()}${Math.floor(Math.random() * 10001)}` : 'id_estatico';

        objects.push({
          id,
          name: `João Lucas ${i}`,
          username: `johnny${i}`,
          email: 'johnny@docassist.com.br',
          type: i < random ? '1' : '2',
          typeName: i < random ? 'Médico(a)' : 'Secretário(a)',
          typeOf: i < random ? [] : ids
        });

        if (i < random) {
          ids.push(id);
        }
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
