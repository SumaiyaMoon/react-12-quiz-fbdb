import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "firebase/auth";
  import { getDatabase, ref, set, onValue, push, onChildAdded, Database } from "firebase/database";
  import { app } from "./firebase-config";
  
  let auth = getAuth(app);
  let db = getDatabase(app);
  
  export let fbLogin = (body: any) => {
    return new Promise((resolve, reject) => {
      if (!body.email || !body.password) {
        reject("Email and Password is requied");
      } else {
        signInWithEmailAndPassword(auth, body.email, body.password)
          .then((res) => {
            let id = res.user.uid;
  
            const reference = ref(db, `users/${id}`);
  
            onValue(reference, (data) => {
              if (data.exists()) {
                resolve(data.val());
              } else {
                reject("Data Not Found");
              }
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };
  export let fbSignUp = (body: any) => {
    return new Promise((resolve, reject) => {
      if (!body.email || !body.password) {
        reject("Email and Password is requied");
      } else {
        createUserWithEmailAndPassword(auth, body.email, body.password)
          .then((res) => {
            let id = res.user.uid;
            body.id = id;
            const reference = ref(db, `users/${id}`);
  
            set(reference, body).then((user) => {
              resolve("User Created Successfully");
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };
  
  export let fbAdd = (nodeName: string, body: any, id?: string) => {
    return new Promise((resolve, reject) => {
      const TaskId = push(ref(db, `${nodeName}/`)).key;
      body.id = TaskId;
      const reference = ref(db, `${nodeName}/${body.id}`);
  
      set(reference, body)
        .then((res) => {
          resolve("Data Send Successfully");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  export let fbDelete = () => {};
  export let fbEdit = () => {};
  export let fbGet = (nodeName: string, id?: any) => {
    return new Promise((resolve, reject) => {
      const reference = ref(db, `${nodeName}/${id ? id : ""}`);
      onValue(reference, (data) => {
        if (data.exists()) {
          resolve(Object.values(data.val()));
        } else {
          reject("No Data Found :(");
        }
      });
    });
  };
  export let fbGetById = () => {};
  export let fbAuth = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          resolve(uid);
        } else {
          reject("No User is Logged in");
        }
      });
    });
  };
  export let fbLogOut = () =>{
return signOut(auth)
  }
