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
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getAssignmentType } from "../graphql/queries";
import { updateAssignmentType } from "../graphql/mutations";
const client = generateClient();
export default function AssignmentTypeUpdateForm(props) {
  const {
    id: idProp,
    assignmentType: assignmentTypeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    maxScore: "",
    weight: "",
    defaultName: "",
    lockWeights: false,
    totalScore: "",
    maxTotalScore: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [maxScore, setMaxScore] = React.useState(initialValues.maxScore);
  const [weight, setWeight] = React.useState(initialValues.weight);
  const [defaultName, setDefaultName] = React.useState(
    initialValues.defaultName
  );
  const [lockWeights, setLockWeights] = React.useState(
    initialValues.lockWeights
  );
  const [totalScore, setTotalScore] = React.useState(initialValues.totalScore);
  const [maxTotalScore, setMaxTotalScore] = React.useState(
    initialValues.maxTotalScore
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = assignmentTypeRecord
      ? { ...initialValues, ...assignmentTypeRecord }
      : initialValues;
    setName(cleanValues.name);
    setMaxScore(cleanValues.maxScore);
    setWeight(cleanValues.weight);
    setDefaultName(cleanValues.defaultName);
    setLockWeights(cleanValues.lockWeights);
    setTotalScore(cleanValues.totalScore);
    setMaxTotalScore(cleanValues.maxTotalScore);
    setErrors({});
  };
  const [assignmentTypeRecord, setAssignmentTypeRecord] = React.useState(
    assignmentTypeModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getAssignmentType.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getAssignmentType
        : assignmentTypeModelProp;
      setAssignmentTypeRecord(record);
    };
    queryData();
  }, [idProp, assignmentTypeModelProp]);
  React.useEffect(resetStateValues, [assignmentTypeRecord]);
  const validations = {
    name: [{ type: "Required" }],
    maxScore: [],
    weight: [],
    defaultName: [],
    lockWeights: [],
    totalScore: [],
    maxTotalScore: [],
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
          name,
          maxScore: maxScore ?? null,
          weight: weight ?? null,
          defaultName: defaultName ?? null,
          lockWeights: lockWeights ?? null,
          totalScore: totalScore ?? null,
          maxTotalScore: maxTotalScore ?? null,
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
            query: updateAssignmentType.replaceAll("__typename", ""),
            variables: {
              input: {
                id: assignmentTypeRecord.id,
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
      {...getOverrideProps(overrides, "AssignmentTypeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              maxScore,
              weight,
              defaultName,
              lockWeights,
              totalScore,
              maxTotalScore,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Max score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxScore}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              maxScore: value,
              weight,
              defaultName,
              lockWeights,
              totalScore,
              maxTotalScore,
            };
            const result = onChange(modelFields);
            value = result?.maxScore ?? value;
          }
          if (errors.maxScore?.hasError) {
            runValidationTasks("maxScore", value);
          }
          setMaxScore(value);
        }}
        onBlur={() => runValidationTasks("maxScore", maxScore)}
        errorMessage={errors.maxScore?.errorMessage}
        hasError={errors.maxScore?.hasError}
        {...getOverrideProps(overrides, "maxScore")}
      ></TextField>
      <TextField
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={weight}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              maxScore,
              weight: value,
              defaultName,
              lockWeights,
              totalScore,
              maxTotalScore,
            };
            const result = onChange(modelFields);
            value = result?.weight ?? value;
          }
          if (errors.weight?.hasError) {
            runValidationTasks("weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("weight", weight)}
        errorMessage={errors.weight?.errorMessage}
        hasError={errors.weight?.hasError}
        {...getOverrideProps(overrides, "weight")}
      ></TextField>
      <TextField
        label="Default name"
        isRequired={false}
        isReadOnly={false}
        value={defaultName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              maxScore,
              weight,
              defaultName: value,
              lockWeights,
              totalScore,
              maxTotalScore,
            };
            const result = onChange(modelFields);
            value = result?.defaultName ?? value;
          }
          if (errors.defaultName?.hasError) {
            runValidationTasks("defaultName", value);
          }
          setDefaultName(value);
        }}
        onBlur={() => runValidationTasks("defaultName", defaultName)}
        errorMessage={errors.defaultName?.errorMessage}
        hasError={errors.defaultName?.hasError}
        {...getOverrideProps(overrides, "defaultName")}
      ></TextField>
      <SwitchField
        label="Lock weights"
        defaultChecked={false}
        isDisabled={false}
        isChecked={lockWeights}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              maxScore,
              weight,
              defaultName,
              lockWeights: value,
              totalScore,
              maxTotalScore,
            };
            const result = onChange(modelFields);
            value = result?.lockWeights ?? value;
          }
          if (errors.lockWeights?.hasError) {
            runValidationTasks("lockWeights", value);
          }
          setLockWeights(value);
        }}
        onBlur={() => runValidationTasks("lockWeights", lockWeights)}
        errorMessage={errors.lockWeights?.errorMessage}
        hasError={errors.lockWeights?.hasError}
        {...getOverrideProps(overrides, "lockWeights")}
      ></SwitchField>
      <TextField
        label="Total score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalScore}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              maxScore,
              weight,
              defaultName,
              lockWeights,
              totalScore: value,
              maxTotalScore,
            };
            const result = onChange(modelFields);
            value = result?.totalScore ?? value;
          }
          if (errors.totalScore?.hasError) {
            runValidationTasks("totalScore", value);
          }
          setTotalScore(value);
        }}
        onBlur={() => runValidationTasks("totalScore", totalScore)}
        errorMessage={errors.totalScore?.errorMessage}
        hasError={errors.totalScore?.hasError}
        {...getOverrideProps(overrides, "totalScore")}
      ></TextField>
      <TextField
        label="Max total score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxTotalScore}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              maxScore,
              weight,
              defaultName,
              lockWeights,
              totalScore,
              maxTotalScore: value,
            };
            const result = onChange(modelFields);
            value = result?.maxTotalScore ?? value;
          }
          if (errors.maxTotalScore?.hasError) {
            runValidationTasks("maxTotalScore", value);
          }
          setMaxTotalScore(value);
        }}
        onBlur={() => runValidationTasks("maxTotalScore", maxTotalScore)}
        errorMessage={errors.maxTotalScore?.errorMessage}
        hasError={errors.maxTotalScore?.hasError}
        {...getOverrideProps(overrides, "maxTotalScore")}
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
          isDisabled={!(idProp || assignmentTypeModelProp)}
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
              !(idProp || assignmentTypeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
