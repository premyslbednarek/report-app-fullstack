/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReportWithFilesDto } from '../models/CreateReportWithFilesDto';
import type { ReportOutDto } from '../models/ReportOutDto';
import type { UpdateReportWithFilesDto } from '../models/UpdateReportWithFilesDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReportService {
    /**
     * @param formData
     * @returns ReportOutDto
     * @throws ApiError
     */
    public static reportControllerCreate(
        formData: CreateReportWithFilesDto,
    ): CancelablePromise<ReportOutDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/report',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @returns ReportOutDto
     * @throws ApiError
     */
    public static reportControllerFindAll(): CancelablePromise<Array<ReportOutDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/report',
        });
    }
    /**
     * @param id
     * @returns ReportOutDto
     * @throws ApiError
     */
    public static reportControllerFindOne(
        id: string,
    ): CancelablePromise<ReportOutDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/report/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param formData
     * @returns ReportOutDto
     * @throws ApiError
     */
    public static reportControllerUpdate(
        id: string,
        formData: UpdateReportWithFilesDto,
    ): CancelablePromise<ReportOutDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/report/{id}',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static reportControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/report/{id}',
            path: {
                'id': id,
            },
        });
    }
}
