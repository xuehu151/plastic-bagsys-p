/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

console.log(location.origin);
let url = location.origin + '/';
export const environment = {
    production: true,
    // apiBase: url,
    apiBase: 'http://39.97.227.149:10001/'
};
