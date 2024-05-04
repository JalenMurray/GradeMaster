/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getClass } from "../graphql/queries";
import { updateClass } from "../graphql/mutations";
const client = generateClient();
export default function ClassUpdateForm(props) {
  const {
    id: idProp,
    class: classModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    code: "",
    title: "",
    score: "",
    desiredScore: "",
    displayColor: "",
    units: "",
  };
  const [code, setCode] = React.useState(initialValues.code);
  const [title, setTitle] = React.useState(initialValues.title);
  const [score, setScore] = React.useState(initialValues.score);
  const [desiredScore, setDesiredScore] = React.useState(
    initialValues.desiredScore
  );
  const [displayColor, setDisplayColor] = React.useState(
    initialValues.displayColor
  );
  const [units, setUnits] = React.useState(initialValues.units);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = classRecord
      ? { ...initialValues, ...classRecord }
      : initialValues;
    setCode(cleanValues.code);
    setTitle(cleanValues.title);
    setScore(cleanValues.score);
    setDesiredScore(cleanValues.desiredScore);
    setDisplayColor(cleanValues.displayColor);
    setUnits(cleanValues.units);
    setErrors({});
  };
  const [classRecord, setClassRecord] = React.useState(classModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getClass.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getClass
        : classModelProp;
      setClassRecord(record);
    };
    queryData();
  }, [idProp, classModelProp]);
  React.useEffect(resetStateValues, [classRecord]);
  const validations = {
    code: [{ type: "Required" }],
    title: [{ type: "Required" }],
    score: [],
    desiredScore: [],
    displayColor: [],
    units: [{ type: "Required" }],
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
          code,
          title,
          score: score ?? null,
          desiredScore: desiredScore ?? null,
          displayColor: displayColor ?? null,
          units,
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
            query: updateClass.replaceAll("__typename", ""),
            variables: {
              input: {
                id: classRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ClassUpdateForm")}
      {...rest}
    >
      <TextField
        label="Code"
        isRequired={true}
        isReadOnly={false}
        value={code}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code: value,
              title,
              score,
              desiredScore,
              displayColor,
              units,
            };
            const result = onChange(modelFields);
            value = result?.code ?? value;
          }
          if (errors.code?.hasError) {
            runValidationTasks("code", value);
          }
          setCode(value);
        }}
        onBlur={() => runValidationTasks("code", code)}
        errorMessage={errors.code?.errorMessage}
        hasError={errors.code?.hasError}
        {...getOverrideProps(overrides, "code")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              title: value,
              score,
              desiredScore,
              displayColor,
              units,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={score}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              code,
              title,
              score: value,
              desiredScore,
              displayColor,
              units,
            };
            const result = onChange(modelFields);
            value = result?.score ?? value;
          }
          if (errors.score?.hasError) {
            runValidationTasks("score", value);
          }
          setScore(value);
        }}
        onBlur={() => runValidationTasks("score", score)}
        errorMessage={errors.score?.errorMessage}
        hasError={errors.score?.hasError}
        {...getOverrideProps(overrides, "score")}
      ></TextField>
      <TextField
        label="Desired score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={desiredScore}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              code,
              title,
              score,
              desiredScore: value,
              displayColor,
              units,
            };
            const result = onChange(modelFields);
            value = result?.desiredScore ?? value;
          }
          if (errors.desiredScore?.hasError) {
            runValidationTasks("desiredScore", value);
          }
          setDesiredScore(value);
        }}
        onBlur={() => runValidationTasks("desiredScore", desiredScore)}
        errorMessage={errors.desiredScore?.errorMessage}
        hasError={errors.desiredScore?.hasError}
        {...getOverrideProps(overrides, "desiredScore")}
      ></TextField>
      <TextField
        label="Display color"
        isRequired={false}
        isReadOnly={false}
        value={displayColor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              code,
              title,
              score,
              desiredScore,
              displayColor: value,
              units,
            };
            const result = onChange(modelFields);
            value = result?.displayColor ?? value;
          }
          if (errors.displayColor?.hasError) {
            runValidationTasks("displayColor", value);
          }
          setDisplayColor(value);
        }}
        onBlur={() => runValidationTasks("displayColor", displayColor)}
        errorMessage={errors.displayColor?.errorMessage}
        hasError={errors.displayColor?.hasError}
        {...getOverrideProps(overrides, "displayColor")}
      ></TextField>
      <TextField
        label="Units"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={units}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              code,
              title,
              score,
              desiredScore,
              displayColor,
              units: value,
            };
            const result = onChange(modelFields);
            value = result?.units ?? value;
          }
          if (errors.units?.hasError) {
            runValidationTasks("units", value);
          }
          setUnits(value);
        }}
        onBlur={() => runValidationTasks("units", units)}
        errorMessage={errors.units?.errorMessage}
        hasError={errors.units?.hasError}
        {...getOverrideProps(overrides, "units")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || classModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || classModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
