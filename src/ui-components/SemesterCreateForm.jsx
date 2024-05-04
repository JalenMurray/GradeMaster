/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createSemester } from "../graphql/mutations";
const client = generateClient();
export default function SemesterCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    season: "",
    year: "",
    current: false,
  };
  const [season, setSeason] = React.useState(initialValues.season);
  const [year, setYear] = React.useState(initialValues.year);
  const [current, setCurrent] = React.useState(initialValues.current);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSeason(initialValues.season);
    setYear(initialValues.year);
    setCurrent(initialValues.current);
    setErrors({});
  };
  const validations = {
    season: [],
    year: [],
    current: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          season,
          year,
          current,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createSemester.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SemesterCreateForm")}
      {...rest}
    >
      <SelectField
        label="Season"
        placeholder="Please select an option"
        isDisabled={false}
        value={season}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              season: value,
              year,
              current,
            };
            const result = onChange(modelFields);
            value = result?.season ?? value;
          }
          if (errors.season?.hasError) {
            runValidationTasks("season", value);
          }
          setSeason(value);
        }}
        onBlur={() => runValidationTasks("season", season)}
        errorMessage={errors.season?.errorMessage}
        hasError={errors.season?.hasError}
        {...getOverrideProps(overrides, "season")}
      >
        <option
          children="Spring"
          value="SPRING"
          {...getOverrideProps(overrides, "seasonoption0")}
        ></option>
        <option
          children="Summer"
          value="SUMMER"
          {...getOverrideProps(overrides, "seasonoption1")}
        ></option>
        <option
          children="Fall"
          value="FALL"
          {...getOverrideProps(overrides, "seasonoption2")}
        ></option>
        <option
          children="Winter"
          value="WINTER"
          {...getOverrideProps(overrides, "seasonoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              season,
              year: value,
              current,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <SwitchField
        label="Current"
        defaultChecked={false}
        isDisabled={false}
        isChecked={current}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              season,
              year,
              current: value,
            };
            const result = onChange(modelFields);
            value = result?.current ?? value;
          }
          if (errors.current?.hasError) {
            runValidationTasks("current", value);
          }
          setCurrent(value);
        }}
        onBlur={() => runValidationTasks("current", current)}
        errorMessage={errors.current?.errorMessage}
        hasError={errors.current?.hasError}
        {...getOverrideProps(overrides, "current")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
