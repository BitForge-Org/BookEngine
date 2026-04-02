/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProviderController } from './../modules/provider/provider.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ProviderType": {
        "dataType": "refEnum",
        "enums": ["individual","business"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderBusiness": {
        "dataType": "refEnum",
        "enums": ["Doctor","Hospital","Clinic","Lab","Pharmacy","Gym","Beauty Salon","Spa","Fitness Center","salon","artist","consultant","Other"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderStatus": {
        "dataType": "refEnum",
        "enums": ["active","inactive","pending","rejected","suspended","deleted","draft"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderResponseSocialLinkDto": {
        "dataType": "refObject",
        "properties": {
            "platform": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderResponseContactInfoDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "phone": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderResponseLocationDto": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string"},
            "city": {"dataType":"string"},
            "state": {"dataType":"string"},
            "zip": {"dataType":"string"},
            "country": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "displayName": {"dataType":"string","required":true},
            "businessName": {"dataType":"string"},
            "providerType": {"ref":"ProviderType","required":true},
            "providerBusiness": {"ref":"ProviderBusiness","required":true},
            "bookingSlug": {"dataType":"string","required":true},
            "status": {"ref":"ProviderStatus","required":true},
            "isActive": {"dataType":"boolean","required":true},
            "logoUrl": {"dataType":"string"},
            "bannerUrl": {"dataType":"string"},
            "description": {"dataType":"string"},
            "website": {"dataType":"string"},
            "socialLinks": {"dataType":"array","array":{"dataType":"refObject","ref":"ProviderResponseSocialLinkDto"}},
            "contactInfo": {"ref":"ProviderResponseContactInfoDto"},
            "location": {"ref":"ProviderResponseLocationDto"},
            "timezone": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponseType_ProviderResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"ref":"ProviderResponseDto"},{"dataType":"enum","enums":[null]}],"required":true},
            "meta": {"ref":"Record_string.unknown_"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProviderSocialLinkDto": {
        "dataType": "refObject",
        "properties": {
            "platform": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProviderContactInfoDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "phone": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProviderLocationDto": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string"},
            "city": {"dataType":"string"},
            "state": {"dataType":"string"},
            "zip": {"dataType":"string"},
            "country": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateProviderDto": {
        "dataType": "refObject",
        "properties": {
            "displayName": {"dataType":"string","required":true},
            "businessName": {"dataType":"string"},
            "providerType": {"ref":"ProviderType","required":true},
            "providerBusiness": {"ref":"ProviderBusiness","required":true},
            "bookingSlug": {"dataType":"string","required":true},
            "logoUrl": {"dataType":"string"},
            "bannerUrl": {"dataType":"string"},
            "description": {"dataType":"string"},
            "website": {"dataType":"string"},
            "socialLinks": {"dataType":"array","array":{"dataType":"refObject","ref":"CreateProviderSocialLinkDto"}},
            "contactInfo": {"ref":"CreateProviderContactInfoDto"},
            "location": {"ref":"CreateProviderLocationDto"},
            "timezone": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderPublicResponseSocialLinkDto": {
        "dataType": "refObject",
        "properties": {
            "platform": {"dataType":"string","required":true},
            "url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderPublicResponseContactInfoDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "phone": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderPublicResponseLocationDto": {
        "dataType": "refObject",
        "properties": {
            "city": {"dataType":"string"},
            "state": {"dataType":"string"},
            "country": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProviderPublicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "displayName": {"dataType":"string","required":true},
            "businessName": {"dataType":"string"},
            "providerType": {"ref":"ProviderType","required":true},
            "providerBusiness": {"ref":"ProviderBusiness","required":true},
            "bookingSlug": {"dataType":"string","required":true},
            "logoUrl": {"dataType":"string"},
            "bannerUrl": {"dataType":"string"},
            "description": {"dataType":"string"},
            "website": {"dataType":"string"},
            "socialLinks": {"dataType":"array","array":{"dataType":"refObject","ref":"ProviderPublicResponseSocialLinkDto"}},
            "contactInfo": {"ref":"ProviderPublicResponseContactInfoDto"},
            "location": {"ref":"ProviderPublicResponseLocationDto"},
            "timezone": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponseType_ProviderPublicResponseDto_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"ref":"ProviderPublicResponseDto"},{"dataType":"enum","enums":[null]}],"required":true},
            "meta": {"ref":"Record_string.unknown_"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponseType_ProviderResponseDto-Array_": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ProviderResponseDto"}},{"dataType":"enum","enums":[null]}],"required":true},
            "meta": {"ref":"Record_string.unknown_"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateProviderDto": {
        "dataType": "refObject",
        "properties": {
            "displayName": {"dataType":"string"},
            "businessName": {"dataType":"string"},
            "providerType": {"dataType":"string"},
            "providerBusiness": {"dataType":"string"},
            "timezone": {"dataType":"string"},
            "bookingSlug": {"dataType":"string"},
            "logoUrl": {"dataType":"string"},
            "bannerUrl": {"dataType":"string"},
            "description": {"dataType":"string"},
            "website": {"dataType":"string"},
            "socialLinks": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"url":{"dataType":"string","required":true},"platform":{"dataType":"string","required":true}}}},
            "contactInfo": {"dataType":"nestedObjectLiteral","nestedProperties":{"phone":{"dataType":"string"},"email":{"dataType":"string"}}},
            "location": {"dataType":"nestedObjectLiteral","nestedProperties":{"country":{"dataType":"string"},"zip":{"dataType":"string"},"state":{"dataType":"string"},"city":{"dataType":"string"},"address":{"dataType":"string"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsProviderController_createProvider: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateProviderDto"},
        };
        app.post('/providers',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.createProvider)),

            async function ProviderController_createProvider(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_createProvider, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'createProvider',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProviderController_getProviderById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/providers/:id',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.getProviderById)),

            async function ProviderController_getProviderById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_getProviderById, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'getProviderById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProviderController_getProviderBySlug: Record<string, TsoaRoute.ParameterSchema> = {
                slug: {"in":"path","name":"slug","required":true,"dataType":"string"},
        };
        app.get('/providers/slug/:slug',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.getProviderBySlug)),

            async function ProviderController_getProviderBySlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_getProviderBySlug, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'getProviderBySlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProviderController_getPublicProviderBySlug: Record<string, TsoaRoute.ParameterSchema> = {
                slug: {"in":"path","name":"slug","required":true,"dataType":"string"},
        };
        app.get('/providers/public/:slug',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.getPublicProviderBySlug)),

            async function ProviderController_getPublicProviderBySlug(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_getPublicProviderBySlug, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'getPublicProviderBySlug',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProviderController_getAllProviders: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"in":"query","name":"page","dataType":"double"},
                limit: {"in":"query","name":"limit","dataType":"double"},
                providerType: {"in":"query","name":"providerType","dataType":"string"},
                status: {"in":"query","name":"status","dataType":"string"},
                isActive: {"in":"query","name":"isActive","dataType":"boolean"},
        };
        app.get('/providers',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.getAllProviders)),

            async function ProviderController_getAllProviders(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_getAllProviders, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'getAllProviders',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProviderController_updateProvider: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateProviderDto"},
        };
        app.put('/providers/:id',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.updateProvider)),

            async function ProviderController_updateProvider(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_updateProvider, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'updateProvider',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProviderController_deactivateProvider: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.patch('/providers/:id/deactivate',
            ...(fetchMiddlewares<RequestHandler>(ProviderController)),
            ...(fetchMiddlewares<RequestHandler>(ProviderController.prototype.deactivateProvider)),

            async function ProviderController_deactivateProvider(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProviderController_deactivateProvider, request, response });

                const controller = new ProviderController();

              await templateService.apiHandler({
                methodName: 'deactivateProvider',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
