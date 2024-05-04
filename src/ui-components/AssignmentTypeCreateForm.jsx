/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAssignmentType } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function AssignmentTypeCreateForm(props) {
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
    name: "",
    maxScore: "",
    weight: "",
    defaultName: "",
    lockWeights: false,
    totalScore: "",
    maxTotalScore: "",
    assignments: [],
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
  const [assignments, setAssignments] = React.useState(
    initialValues.assignments
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setMaxScore(initialValues.maxScore);
    setWeight(initialValues.weight);
    setDefaultName(initialValues.defaultName);
    setLockWeights(initialValues.lockWeights);
    setTotalScore(initialValues.totalScore);
    setMaxTotalScore(initialValues.maxTotalScore);
    setAssignments(initialValues.assignments);
    setCurrentAssignmentsValue("");
    setErrors({});
  };
  const [currentAssignmentsValue, setCurrentAssignmentsValue] =
    React.useState("");
  const assignmentsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    maxScore: [],
    weight: [],
    defaultName: [],
    lockWeights: [],
    totalScore: [],
    maxTotalScore: [],
    assignments: [{ type: "JSON" }],
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
          maxScore,
          weight,
          defaultName,
          lockWeights,
          totalScore,
          maxTotalScore,
          assignments,
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
            query: createAssignmentType.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "AssignmentTypeCreateForm")}
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
              assignments,
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
              assignments,
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
              assignments,
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
              assignments,
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
              assignments,
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
              assignments,
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
              assignments,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              maxScore,
              weight,
              defaultName,
              lockWeights,
              totalScore,
              maxTotalScore,
              assignments: values,
            };
            const result = onChange(modelFields);
            values = result?.assignments ?? values;
          }
          setAssignments(values);
          setCurrentAssignmentsValue("");
        }}
        currentFieldValue={currentAssignmentsValue}
        label={"Assignments"}
        items={assignments}
        hasError={errors?.assignments?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("assignments", currentAssignmentsValue)
        }
        errorMessage={errors?.assignments?.errorMessage}
        setFieldValue={setCurrentAssignmentsValue}
        inputFieldRef={assignmentsRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Assignments"
          isRequired={false}
          isReadOnly={false}
          value={currentAssignmentsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.assignments?.hasError) {
              runValidationTasks("assignments", value);
            }
            setCurrentAssignmentsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("assignments", currentAssignmentsValue)
          }
          errorMessage={errors.assignments?.errorMessage}
          hasError={errors.assignments?.hasError}
          ref={assignmentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "assignments")}
        ></TextAreaField>
      </ArrayField>
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
