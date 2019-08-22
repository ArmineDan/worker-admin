import {db} from "./firebase";
export function getActiveCategories() {
   return new Promise((resolve, reject)=>{
       db.collection('Categories').where("status", "==", true).get().then((snapshot)=>{
           const data = [];
           snapshot.docs.forEach(doc=>{
               const obj={...doc.data(),id:doc.id}
               data.push(obj);
           });
          resolve(data)
       }).catch(e=> reject(e));
   })
}
export function getsubCategories(id) {
   return new Promise((resolve, reject)=>{
       db.collection('Categories').doc(id).collection('sub').get().then((snapshot)=>{
           const data = [];
           snapshot.docs.forEach(doc=>{
               const obj={...doc.data(),id:doc.id};
               data.push(obj);
           });
           resolve(data)
       }).catch(e=> reject(e));
   })
}

export function getActiveUsers() {
   return new Promise((resolve, reject)=>{
       db.collection('users').where("status", "==", true).get().then((snapshot)=>{
           const data = [];
           const id=[];
           snapshot.docs.forEach(doc=>{
               const obj={...doc.data(),id:doc.id}
               data.push(obj);
               id.push(doc.id);
           });
          resolve(data)
       }).catch(e=> reject(e));
   })
}

export function getSubscribedUsers() {
   return new Promise((resolve, reject)=>{
       db.collection('subscribe').get().then((snapshot)=>{
           const data = [];
           const id=[];
           snapshot.docs.forEach(doc=>{
               const obj={...doc.data(),id:doc.id}
               data.push(obj);
               id.push(doc.id);
           });
          resolve(data)
       }).catch(e=> reject(e));
   })
}

export function getArchiveUsers() {
    return new Promise((resolve, reject)=>{
        db.collection('users').where("status", "==", false).get().then((snapshot)=>{
            const data = [];
            const id=[];
            snapshot.docs.forEach(doc=>{
                const obj={...doc.data(),id:doc.id}
                data.push(obj);
                id.push(doc.id);
            });
           resolve(data)
        }).catch(e=> reject(e));
    })
}


export function editSubCategorie(cat_id,sub_id,obj) {
    return new Promise((resolve, reject) => {
        db.collection('Categories').doc(cat_id).collection('sub').doc(sub_id).update(obj).then((data)=>{
            resolve(data)
        }).catch(e=> reject(e));
    })
}

export function editCategorie(cat_id,obj) {
    return new Promise((resolve, reject) => {
        db.collection('Categories').doc(cat_id).update(obj).then((data)=>{
            resolve(data)
        }).catch(e=> reject(e));
    })
}