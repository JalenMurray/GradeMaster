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
export declare type AssignmentTypeUpdateFormInputValues = {
    name?: string;
    maxScore?: number;
    weight?: number;
    defaultName?: string;
    lockWeights?: boolean;
    totalScore?: number;
    maxTotalScore?: number;
};
export declare type AssignmentTypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    maxScore?: ValidationFunction<number>;
    weight?: ValidationFunction<number>;
    defaultName?: ValidationFunction<string>;
    lockWeights?: ValidationFunction<boolean>;
    totalScore?: ValidationFunction<number>;
    maxTotalScore?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AssignmentTypeUpdateFormOverridesProps = {
    AssignmentTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    maxScore?: PrimitiveOverrideProps<TextFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    defaultName?: PrimitiveOverrideProps<TextFieldProps>;
    lockWeights?: PrimitiveOverrideProps<SwitchFieldProps>;
    totalScore?: PrimitiveOverrideProps<TextFieldProps>;
    maxTotalScore?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AssignmentTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: AssignmentTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    assignmentType?: any;
    onSubmit?: (fields: AssignmentTypeUpdateFormInputValues) => AssignmentTypeUpdateFormInputValues;
    onSuccess?: (fields: AssignmentTypeUpdateFormInputValues) => void;
    onError?: (fields: AssignmentTypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AssignmentTypeUpdateFormInputValues) => AssignmentTypeUpdateFormInputValues;
    onValidate?: AssignmentTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AssignmentTypeUpdateForm(props: AssignmentTypeUpdateFormProps): React.ReactElement;
