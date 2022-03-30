import React from "react";
import { Field } from "formik";
import classNames from "classnames";

// Input Feedback
const InputFeedback = ({ error }) => error ? <div className={classNames("input-feedback")}> {error} </div> : null;

// Radio input
const Checkbox = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    customContent,
    ...props
}) => {
    return (
        <div className={classNames("checkbox", { checked: id === value })}>
            <input
                name={name}
                id={id}
                type="checkbox"
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
                        <i className={
                            id === value ? "icon-check-box" : "icon-check-box-outline_blank"
                        }
                            size={20}
                        />
                        {""}
                        {label}
                    </div>
                )}
            </label>
        </div>
    );
};

// Radio group
const CheckboxGroup = ({
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
     className);

     return(
         <div className={classes}>
            {label && <label> {label} </label>}
            <div className="checkbox-wrapper"> {children} </div>
            {touched && <InputFeedback error={error} />}
         </div>
     );
};

const CheckboxInput = ({
    name,
    label,
    options = [],
    display = "block",
    customContent
}) => {
    return(
        <CheckboxGroup id={name} label={label} display={display}>
            {options.map((option) => {
                return(
                    <Field 
                        component={Checkbox}
                        name={name}
                        id={option.value}
                        label={option.label}
                        icon={option.icon || ""}
                        customContent={customContent}
                    />
                );
            })}
        </CheckboxGroup>
    );
};


export default CheckboxInput;