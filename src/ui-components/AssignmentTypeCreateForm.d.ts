/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AssignmentTypeCreateFormInputValues = {
    name?: string;
    maxScore?: number;
    weight?: number;
    defaultName?: string;
    lockWeights?: boolean;
    totalScore?: number;
    maxTotalScore?: number;
};
export declare type AssignmentTypeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    maxScore?: ValidationFunction<number>;
    weight?: ValidationFunction<number>;
    defaultName?: ValidationFunction<string>;
    lockWeights?: ValidationFunction<boolean>;
    totalScore?: ValidationFunction<number>;
    maxTotalScore?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AssignmentTypeCreateFormOverridesProps = {
    AssignmentTypeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    maxScore?: PrimitiveOverrideProps<TextFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    defaultName?: PrimitiveOverrideProps<TextFieldProps>;
    lockWeights?: PrimitiveOverrideProps<SwitchFieldProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    maxTotalScore?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AssignmentTypeCreateFormProps = React.PropsWithChildren<{
    overrides?: AssignmentTypeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AssignmentTypeCreateFormInputValues) => AssignmentTypeCreateFormInputValues;
    onSuccess?: (fields: AssignmentTypeCreateFormInputValues) => void;
    onError?: (fields: AssignmentTypeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AssignmentTypeCreateFormInputValues) => AssignmentTypeCreateFormInputValues;
    onValidate?: AssignmentTypeCreateFormValidationValues;
} & React.CSSProperties>;
export default function AssignmentTypeCreateForm(props: AssignmentTypeCreateFormProps): React.ReactElement;
