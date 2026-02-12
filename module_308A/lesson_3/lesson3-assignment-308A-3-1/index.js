import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  try {
    const dbName = await central(id);

    const [basicInfo, personalInfo] = await Promise.all([
      dbs[dbName](id), 
      vault(id)
    ]);

    return {
      id: id,
      ...personalInfo,
      ...basicInfo
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

// This line actually runs the code so you can see it in the terminal
getUserData(1).then(console.log).catch(console.error);