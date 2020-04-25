# Architecture

##### Customer
```
{
    "uid": UUID,
    "personalId": String,
    "before": UUID,
    "storeID": UUID
}
```
- `uid` is automatically generated for customer
- `personalId` is the friendly id chosen by the user
- `before` the customer right in front of this user. A customer is first in line if `before==null`
- `storeId` the store for which the customer is in line

##### Store
```
{
    "uid": UUID,
    "name": String,
    "latitude": Long,
    "longitude": Long,
    "open": Int,
    "close": Int
}
```
- `uid` is automatically generated for the store
- `name` the store name
- `latitude` the latitude of the store
- `longitude` the longitude of the store
- `open` the opening time of the store in minutes of the day
- `close` the closing time of the store in minutes of the day
