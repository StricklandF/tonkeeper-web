/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GetRawListBlockTransactions200ResponseIdsInner
 */
export interface GetRawListBlockTransactions200ResponseIdsInner {
    /**
     * 
     * @type {number}
     * @memberof GetRawListBlockTransactions200ResponseIdsInner
     */
    mode: number;
    /**
     * 
     * @type {string}
     * @memberof GetRawListBlockTransactions200ResponseIdsInner
     */
    account?: string;
    /**
     * 
     * @type {number}
     * @memberof GetRawListBlockTransactions200ResponseIdsInner
     */
    lt?: number;
    /**
     * 
     * @type {string}
     * @memberof GetRawListBlockTransactions200ResponseIdsInner
     */
    hash?: string;
}

/**
 * Check if a given object implements the GetRawListBlockTransactions200ResponseIdsInner interface.
 */
export function instanceOfGetRawListBlockTransactions200ResponseIdsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "mode" in value;

    return isInstance;
}

export function GetRawListBlockTransactions200ResponseIdsInnerFromJSON(json: any): GetRawListBlockTransactions200ResponseIdsInner {
    return GetRawListBlockTransactions200ResponseIdsInnerFromJSONTyped(json, false);
}

export function GetRawListBlockTransactions200ResponseIdsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetRawListBlockTransactions200ResponseIdsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mode': json['mode'],
        'account': !exists(json, 'account') ? undefined : json['account'],
        'lt': !exists(json, 'lt') ? undefined : json['lt'],
        'hash': !exists(json, 'hash') ? undefined : json['hash'],
    };
}

export function GetRawListBlockTransactions200ResponseIdsInnerToJSON(value?: GetRawListBlockTransactions200ResponseIdsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mode': value.mode,
        'account': value.account,
        'lt': value.lt,
        'hash': value.hash,
    };
}

