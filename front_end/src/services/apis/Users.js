export function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = 5;
      const ids = [];

      for (let i = 1; i <= random; i++) {
        const id = `${new Date().getTime()}${Math.floor(Math.random() * 10001)}`;

        if (i < random) {
          ids.push(id);

          objects.push({
            id,
            name: `Médico ${i}`,
            username: `medico${i}`,
            email: `medico${i}@docassist.com.br`,
            type: '1',
            typeName: 'Médico(a)',
            typeOf: []
          });
        } else {
          objects.push({
            id,
            name: `Secretário 1`,
            username: `secretario1`,
            email: `secretario1@docassist.com.br`,
            type: '2',
            typeName: 'Secretário(a)',
            typeOf: ids
          });
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
