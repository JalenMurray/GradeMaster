/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AssignmentUpdateFormInputValues = {
    name?: string;
    score?: number;
    max_score?: number;
    weight?: number;
};
export declare type AssignmentUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    score?: ValidationFunction<number>;
    max_score?: ValidationFunction<number>;
    weight?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AssignmentUpdateFormOverridesProps = {
    AssignmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    score?: PrimitiveOverrideProps<TextFieldProps>;
    max_score?: PrimitiveOverrideProps<TextFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AssignmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: AssignmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    assignment?: any;
    onSubmit?: (fields: AssignmentUpdateFormInputValues) => AssignmentUpdateFormInputValues;
    onSuccess?: (fields: AssignmentUpdateFormInputValues) => void;
    onError?: (fields: AssignmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AssignmentUpdateFormInputValues) => AssignmentUpdateFormInputValues;
    onValidate?: AssignmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AssignmentUpdateForm(props: AssignmentUpdateFormProps): React.ReactElement;
