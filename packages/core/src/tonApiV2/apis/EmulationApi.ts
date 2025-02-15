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


import * as runtime from '../runtime';
import type {
  AccountEvent,
  EmulateMessageToEventRequest,
  Event,
  GetBlockchainBlockDefaultResponse,
  MessageConsequences,
  Trace,
} from '../models/index';
import {
    AccountEventFromJSON,
    AccountEventToJSON,
    EmulateMessageToEventRequestFromJSON,
    EmulateMessageToEventRequestToJSON,
    EventFromJSON,
    EventToJSON,
    GetBlockchainBlockDefaultResponseFromJSON,
    GetBlockchainBlockDefaultResponseToJSON,
    MessageConsequencesFromJSON,
    MessageConsequencesToJSON,
    TraceFromJSON,
    TraceToJSON,
} from '../models/index';

export interface EmulateMessageToAccountEventRequest {
    accountId: string;
    emulateMessageToEventRequest: EmulateMessageToEventRequest;
    acceptLanguage?: string;
}

export interface EmulateMessageToEventOperationRequest {
    emulateMessageToEventRequest: EmulateMessageToEventRequest;
    acceptLanguage?: string;
}

export interface EmulateMessageToTraceRequest {
    emulateMessageToEventRequest: EmulateMessageToEventRequest;
}

export interface EmulateMessageToWalletRequest {
    emulateMessageToEventRequest: EmulateMessageToEventRequest;
    acceptLanguage?: string;
}

/**
 * EmulationApi - interface
 * 
 * @export
 * @interface EmulationApiInterface
 */
export interface EmulationApiInterface {
    /**
     * Emulate sending message to blockchain
     * @param {string} accountId account ID
     * @param {EmulateMessageToEventRequest} emulateMessageToEventRequest bag-of-cells serialized to base64
     * @param {string} [acceptLanguage] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmulationApiInterface
     */
    emulateMessageToAccountEventRaw(requestParameters: EmulateMessageToAccountEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountEvent>>;

    /**
     * Emulate sending message to blockchain
     */
    emulateMessageToAccountEvent(requestParameters: EmulateMessageToAccountEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountEvent>;

    /**
     * Emulate sending message to blockchain
     * @param {EmulateMessageToEventRequest} emulateMessageToEventRequest bag-of-cells serialized to base64
     * @param {string} [acceptLanguage] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmulationApiInterface
     */
    emulateMessageToEventRaw(requestParameters: EmulateMessageToEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>>;

    /**
     * Emulate sending message to blockchain
     */
    emulateMessageToEvent(requestParameters: EmulateMessageToEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event>;

    /**
     * Emulate sending message to blockchain
     * @param {EmulateMessageToEventRequest} emulateMessageToEventRequest bag-of-cells serialized to base64
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmulationApiInterface
     */
    emulateMessageToTraceRaw(requestParameters: EmulateMessageToTraceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Trace>>;

    /**
     * Emulate sending message to blockchain
     */
    emulateMessageToTrace(requestParameters: EmulateMessageToTraceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Trace>;

    /**
     * Emulate sending message to blockchain
     * @param {EmulateMessageToEventRequest} emulateMessageToEventRequest bag-of-cells serialized to base64
     * @param {string} [acceptLanguage] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmulationApiInterface
     */
    emulateMessageToWalletRaw(requestParameters: EmulateMessageToWalletRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MessageConsequences>>;

    /**
     * Emulate sending message to blockchain
     */
    emulateMessageToWallet(requestParameters: EmulateMessageToWalletRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MessageConsequences>;

}

/**
 * 
 */
export class EmulationApi extends runtime.BaseAPI implements EmulationApiInterface {

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToAccountEventRaw(requestParameters: EmulateMessageToAccountEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AccountEvent>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling emulateMessageToAccountEvent.');
        }

        if (requestParameters.emulateMessageToEventRequest === null || requestParameters.emulateMessageToEventRequest === undefined) {
            throw new runtime.RequiredError('emulateMessageToEventRequest','Required parameter requestParameters.emulateMessageToEventRequest was null or undefined when calling emulateMessageToAccountEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/v2/accounts/{account_id}/events/emulate`.replace(`{${"account_id"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmulateMessageToEventRequestToJSON(requestParameters.emulateMessageToEventRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountEventFromJSON(jsonValue));
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToAccountEvent(requestParameters: EmulateMessageToAccountEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AccountEvent> {
        const response = await this.emulateMessageToAccountEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToEventRaw(requestParameters: EmulateMessageToEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Event>> {
        if (requestParameters.emulateMessageToEventRequest === null || requestParameters.emulateMessageToEventRequest === undefined) {
            throw new runtime.RequiredError('emulateMessageToEventRequest','Required parameter requestParameters.emulateMessageToEventRequest was null or undefined when calling emulateMessageToEvent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/v2/events/emulate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmulateMessageToEventRequestToJSON(requestParameters.emulateMessageToEventRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EventFromJSON(jsonValue));
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToEvent(requestParameters: EmulateMessageToEventOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Event> {
        const response = await this.emulateMessageToEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToTraceRaw(requestParameters: EmulateMessageToTraceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Trace>> {
        if (requestParameters.emulateMessageToEventRequest === null || requestParameters.emulateMessageToEventRequest === undefined) {
            throw new runtime.RequiredError('emulateMessageToEventRequest','Required parameter requestParameters.emulateMessageToEventRequest was null or undefined when calling emulateMessageToTrace.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v2/traces/emulate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmulateMessageToEventRequestToJSON(requestParameters.emulateMessageToEventRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TraceFromJSON(jsonValue));
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToTrace(requestParameters: EmulateMessageToTraceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Trace> {
        const response = await this.emulateMessageToTraceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToWalletRaw(requestParameters: EmulateMessageToWalletRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MessageConsequences>> {
        if (requestParameters.emulateMessageToEventRequest === null || requestParameters.emulateMessageToEventRequest === undefined) {
            throw new runtime.RequiredError('emulateMessageToEventRequest','Required parameter requestParameters.emulateMessageToEventRequest was null or undefined when calling emulateMessageToWallet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.acceptLanguage !== undefined && requestParameters.acceptLanguage !== null) {
            headerParameters['Accept-Language'] = String(requestParameters.acceptLanguage);
        }

        const response = await this.request({
            path: `/v2/wallet/emulate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmulateMessageToEventRequestToJSON(requestParameters.emulateMessageToEventRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MessageConsequencesFromJSON(jsonValue));
    }

    /**
     * Emulate sending message to blockchain
     */
    async emulateMessageToWallet(requestParameters: EmulateMessageToWalletRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MessageConsequences> {
        const response = await this.emulateMessageToWalletRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
