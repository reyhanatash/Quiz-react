import React from 'react';
import Slider from '@material-ui/core/Slider';

const marks = [
  {
    value: 1,
    label: 'آسان',
  },
  {
    value: 5,
    label: 'متوسط',
  },
  {
    value: 9,
    label: 'دشوار',
  },
];
function valuetext(value) {
  return `${value}°C`;
}
function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}
export default function DiscreteSlider(props) {
  const [valueSlider, updateValue] = React.useState(5);
  React.useEffect(
    () => {
      let val;
      if (props.selectedTest) {
        val = props.selectedTest.fldLevel;
      }
      updateValue(val);
      if (props.editMode === false) {
        updateValue(5);
      }
    },
    [props.selectedTest],
    [props.editMode],
  );
  // Change Color
  const style = [];
  if (valueSlider <= 3) {
    style.push('slider-green');
  } else if (valueSlider <= 6) {
    style.push('slider-yellow');
  } else {
    style.push('slider-red');
  }
  return (
    <Slider
      className={style[0]}
      // defaultValue={valueSlider}
      value={valueSlider}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider"
      valueLabelDisplay="auto"
      step={1}
      marks={marks}
      min={1}
      max={9}
      onChange={(e, val) => {
        updateValue(val);
        props.getValueSlider(val);
      }}
    />
  );
}
