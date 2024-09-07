The reason is that when you create a transaction with db.transaction('store1', 'readwrite'), you’re creating a transaction that is only associated with 'store1'. Therefore, you can’t use this transaction (tx in your case) to interact with 'store2'.

If you want to interact with multiple object stores within a single transaction, you need to specify all of them when you create the transaction. Here’s how you can do it:

```js
let tx = db.transaction(['store1', 'store2'], 'readwrite');
let s1 = tx.objectStore('store1');
let s2 = tx.objectStore('store2');
```

In this code, tx is a transaction that can be used to interact with both 'store1' and 'store2'. Then, s1 and s2 are IDBObjectStore instances that represent the 'store1' and 'store2' object stores in the database, respectively.
