import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";

// core components
import styles from "assets/jss/material-dashboard-react/components/customSelectStyle.js";

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";


const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    name,
    value,
    onChange,
    selectionType,
    dataSource,
    labelProps,
    error,
    success
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  let select
  if (selectionType === "multiple")
    select = <Select
      classes={{
        root: marginTop,
        disabled: classes.disabled
      
      }}
      name={name}
      multiple
      value={value}
      onChange={onChange}
      input={<Input id={name + "-chip"} />}
      renderValue={(selected) => (
        <div className={classes.chips}>
          {selected.map((value) => (
            <Chip key={value} label={value} className={classes.chip} />
          ))}
        </div>
      )}
    >
      {dataSource.map((item) => (
        <MenuItem key={item} value={item} >
          {item}
        </MenuItem>
      ))}
    </Select>
  else
    select = <Select
      classes={{
        root: marginTop,
        disabled: classes.disabled
      }}
      name={name}
      value={value}
      onChange={onChange}
    >
      {dataSource.map((item) => (
        <MenuItem key={item} value={item} >
          {item}
        </MenuItem>
      ))}
    </Select>
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={name}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      {select}
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  name: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.string,
  onChange: PropTypes.func,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  dataSource: PropTypes.array
};


