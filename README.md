[![David](https://img.shields.io/david/BuiltonDev/node-sdk.svg?style=flat-square)](https://david-dm.org/BuiltonDev/node-sdk)
[![GitHub release](https://img.shields.io/github/release/BuiltonDev/node-sdk.svg?style=flat-square)](https://github.com/BuiltonDev/node-sdk/releases)
[![license](https://img.shields.io/github/license/BuiltonDev/node-sdk.svg?style=flat-square)](LICENSE.md)

# Builton SDK

[Builton](https://www.builton.dev) offers a platform as a service that digitizes core business functions and optimizes resource allocation with baked-in machine learning capabilities. This SDK gives you a machine-to-machine access to our platform's building blocks and will help you implement its API in a Javascript environment.  Get instant access to modules like Payments, Messaging Tools, User Management, Webhooks, Resource Allocation and more.

If you are looking for a client SDK, take a look at our [Javascript SDK](https://github.com/BuiltonDev/javascript-sdk)

![Builton logo](https://res.cloudinary.com/dftspnwxo/image/upload/v1554131594/Builton_logo_positiv_wc3j7x.svg)



## Requirement

- A Builton API Key
- A Builton Service Account Key

## Install

From [npm](https://npmjs.org)

```sh
npm install @builton/node-sdk
```


## Getting started

`new Builton({ apiKey, bearerToken })`

Initialises a new instance of `Builton` configured with your application `apiKey` and a `bearerToken`.
The `bearerToken` is the service account key.

- **apiKey {String}**: Your attributed Builton API Key.
- **bearerToken {String}**: Your service account key.


### Example: Fetching and updating orders

Using a callback:
```js
builton.orders.get({ size: 5 }, function(err, page) {
  const firstOrder = page.current[0];
  firstOrder.update({ delivery_status: 'DONE' });
});
```

Using promises:
```js
builton.orders.get({ size: 5 }).then((page) => {
  const firstOrder = page.current[0];
  firstOrder.update({ delivery_status: 'DONE' });
});
```

Using async/await:
```js
// This needs to be within in an `async` function
const page = await builton.orders.get({ size: 5 });
const firstOrder = page.current[0];
firstOrder.update({ delivery_status: 'DONE' });
```

### Example: Updating a product method by id

```js
builton.products.update(':productId:', {
  name: 'New name'
});
```

### Example: Using the `set` methods:

The `set` method allows you to create an object without fetching it from the api. I can be useful when working with stored data for example.

```js
const product = builton.products.set(':productId:');
product.update({
  name: 'New name'
});
```

With multiple payment methods:
```js
const paymentMethods = builton.paymentMethods.set([':paymentMethodId1:', ':paymentMethodId2:']);
paymentMethods[0].update({
  token: ':StripeTokenId:'
});
```

With full props:
```js
const paymentMethod = builton.paymentMethods.set({<paymentMethodJsonObject>});
paymentMethod.update({
  token: ':StripeTokenId:'
});
```


## Issue Reporting

If you have found a bug or if you have a feature request, please report them to this repository's issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
