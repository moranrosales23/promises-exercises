/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {function} asyncTransformer
 */
function flatMapPromise(promise, asyncTransformer) {
  return new Promise((resolve, reject) => {
    promise.then((p) => resolve(asyncTransformer(p)), reject);
  });
}

/**
 *
 * EXERCISE 2
 *
 * @param {Promise} firstPromise
 * @param {function} slowAsyncProcess
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess) {
  return firstPromise.then((num) => slowAsyncProcess(num));
}

/**
 *
 * EXERCISE 3
 *
 * @param {function} getUserById
 * @param {function} getOrganizationById
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById) {
  return function getUserByIdWithOrganization(userId) {
    let users = {};
    return getUserById(userId)
      .then((user) => {
        users = user;
        return user ? getOrganizationById(user.organizationId) : user;
      })
      .then((org) =>
        org ? Promise.resolve({ ...users, organization: org }) : org
      );
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
};
