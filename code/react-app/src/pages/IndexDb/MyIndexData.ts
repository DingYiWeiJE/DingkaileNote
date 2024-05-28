const request = indexedDB.open('myIndexDb', 1);


request.onerror = function (event) {
    // 错误处理
    console.error('IndexedDB 打开失败：', event);
}

let db: IDBDatabase | null = null;

request.onsuccess = function (event) {

    db = (event.target as IDBOpenDBRequest).result;

    console.log('IndexedDB 打开成功');
}

request.onupgradeneeded = function (event) {

    db = (event.target as IDBOpenDBRequest).result;

    if (!db.objectStoreNames.contains('myObjectStore')) {
        db.createObjectStore('myObjectStore', { keyPath: 'id' });
    }

    console.log('IndexedDB 升级成功');
}

export function addData(data: any) {
    if (!db) {
        console.error('IndexedDB 未打开');
        return;
    }

    const transaction = db.transaction(['myObjectStore'], 'readwrite');

    const objectStore = transaction.objectStore('myObjectStore');

    objectStore.add(data);

    transaction.oncomplete = function () {
        console.log('数据添加成功');
    }

    transaction.onerror = function (event) {
        console.error('数据添加失败：', event);
    }
}

export async function getData(id: number) {
    return new Promise((resolve, reject) => {

        if (!db) {
            console.error('IndexedDB 未打开');
            reject('IndexedDB 未打开');
            return
        }

        const transaction = db.transaction(['myObjectStore'], 'readonly');

        const objectStore = transaction.objectStore('myObjectStore');

        const request = objectStore.get(id);

        request.onsuccess = function (event) {
            const data = (event.target as IDBRequest).result;
            console.log('获取到的数据：', data);
            resolve(data);
        }

        request.onerror = function (event) {
            console.error('获取数据失败：', event);
            reject(event)
        }
    })
}

export function deleteData(id: number) {
    if (!db) {
        console.error('IndexedDB 未打开');
        return;
    }

    const transaction = db.transaction(['myObjectStore'], 'readwrite');

    const objectStore = transaction.objectStore('myObjectStore');
    
    const request = objectStore.delete(id);
    
    transaction.oncomplete = function () {
        console.log('数据删除成功');
    }

    transaction.onerror = function (event) {
        console.error('数据删除失败：', event);
    }
}

export function clearData() {
    if (!db) {
        console.error('IndexedDB 未打开');
        return;
    }

    const transaction = db.transaction(['myObjectStore'], 'readwrite');

    const objectStore = transaction.objectStore('myObjectStore');
    
    const request = objectStore.clear();
    
    transaction.oncomplete = function () {
        console.log('数据清除成功');
    }
    
    transaction.onerror = function (event) {
        console.error('数据清除失败：', event);
    }
}

export function closeDb() {
    if (db) {
        db.close();
    }
    console.log('IndexedDB 关闭成功');
}

export function getAllData() {
    if (!db) {
        console.error('IndexedDB 未打开');
        return;
    }

    const transaction = db.transaction(['myObjectStore'], 'readonly');

    const objectStore = transaction.objectStore('myObjectStore');
        
    const request = objectStore.getAll();
    
    request.onsuccess = function (event) {
        const data = (event.target as IDBRequest).result;
        console.log('获取到的所有数据：', data);
    }
    
    request.onerror = function (event) {
        console.error('获取数据失败：', event);
    }

}

export function updateData(id: number, newData: any) {
    if (!db) {
        console.error('IndexedDB 未打开');
        return;
    }

    const transaction = db.transaction(['myObjectStore'], 'readwrite');

    const objectStore = transaction.objectStore('myObjectStore');
    
    const getRequest = objectStore.get(id);
    
    getRequest.onsuccess = function(event) {
        const data = (event.target as IDBRequest).result;
        if (data) {
          const updateRequest = objectStore.put(newData);
          updateRequest.onsuccess = function(event) {
            console.log('Data updated successfully');
          };
        } else {
          console.log('Data with ID 887 not found');
        }
    }
}
