/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SemesterCreateFormInputValues = {
    season?: string;
    year?: number;
    current?: boolean;
};
export declare type SemesterCreateFormValidationValues = {
    season?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    current?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SemesterCreateFormOverridesProps = {
    SemesterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    season?: PrimitiveOverrideProps<SelectFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    current?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SemesterCreateFormProps = React.PropsWithChildren<{
    overrides?: SemesterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SemesterCreateFormInputValues) => SemesterCreateFormInputValues;
    onSuccess?: (fields: SemesterCreateFormInputValues) => void;
    onError?: (fields: SemesterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SemesterCreateFormInputValues) => SemesterCreateFormInputValues;
    onValidate?: SemesterCreateFormValidationValues;
} & React.CSSProperties>;
export default function SemesterCreateForm(props: SemesterCreateFormProps): React.ReactElement;
