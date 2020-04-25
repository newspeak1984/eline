# Architecture Design

#### Customer
```
{
    "_id": UUID,
    "personalId": String,
    "storeID": UUID
}
```
- `uid` is automatically generated for customer
- `personalId` is the friendly id chosen by the user
- `storeId` isthe store for which the customer is in line

#### Store
```
{
    "_id": UUID,
    "name": String,
    "latitude": Long,
    "longitude": Long,
    "open": Int,
    "close": Int,
    "employees": [UUID]
}
```
- `uid` is automatically generated for the store
- `name` is the store name
- `latitude` is the latitude of the store
- `longitude` is the longitude of the store
- `open` is the opening time of the store in minutes of the day
- `close` is the closing time of the store in minutes of the day
- `employees` is an array of employees at the store who have access to this system

#### Employee
```
{
    "_id": UUID,
    "personalId": String,
    "storeId": UUID,
    "role": String
}
```
- `uid` is automatically generated for customer
- `personalId` is the friendly id chosen by the user
- `storeId` is the store for which the employee works at
- `permission` is the employees role at the store and governs their permissions on this app

