import React from "react";
import { Field } from "formik";
import classNames from "classnames";

// Input Feedback
const InputFeedback = ({ error }) => error ? <div className={classNames("input-feedback")}></div> : null;

// Radio Input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    label,
    id,
    className,
    customContent,
    ...props
}) => {
    return (
        <div className={classNames("radio-button", { checked: id === value })}>
            <input
                name={name}
                id={id}
                type="radio"
                value={id}
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                {...props}
            />
            <label htmlFor={id}>
                {customContent ? (
                    customContent(label, value, props.icon)
                ) : (
                    <div>
                        <i
                            className={
                                id === value ? "icon-radio-button-checked" : "icon-radio-button-unchecked"
                            }
                            size={20}
                        />
                        {" "}
                        {label}
                    </div>
                )}
            </label>
        </div>
    );
};

// Radio group
const RadioButtonGroup = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children,
    display = "block"
}) => {
    const classes = classNames("form-group",
        {
            success: value || (!error && touched),
            error: !!error && touched,
            inline: display === "inline"
        },
        className
    );

    return (
        <div className={classes}>
            {label && <label> {label} </label>}
            <div className="radio-button-wrapper"> {children} </div>
            {touched && <InputFeedback error={error} />}
        </div>
    );
};

const RadioInput = ({
    name,
    label,
    options = [],
    display = "block",
    customContent
}) => {
    return (
        <RadioButtonGroup id={id} label={label} display={display}>
            {options.map((option) => {
                return (
                    <Field
                        component={RadioButton}
                        name={name}
                        id={option.value}
                        label={option.label}
                        icon={option.icon || ""}
                        customContent={customContent}
                    />
                );
            })}
        </RadioButtonGroup>
    );
};

export default RadioInput;