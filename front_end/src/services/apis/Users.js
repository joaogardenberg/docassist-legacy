export function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objects = [];
      const random = 50;
      let ids = [];

      for (let i = 1; i <= random; i++) {
        const id = `id_usuario_${i}`;

        if (i % 5 !== 0) {
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
            name: `Secretário ${i}`,
            username: `secretario${i}`,
            email: `secretario${i}@docassist.com.br`,
            type: '2',
            typeName: 'Secretário(a)',
            typeOf: ids
          });

          ids = [];
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
