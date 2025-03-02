import React, {useState} from 'react';
import Select, { components } from "react-select";


const InputOption = ({getStyles, Icon, isDisabled, isFocused, isSelected, children, innerProps, ...rest}) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = "transparent";
    if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
        alignItems: "center",
        backgroundColor: bg,
        color: "inherit",
        display: "flex "
    };

    // prop assignment
    const props = {
        ...innerProps,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
        style
    };

    return (
        <components.Option
            {...rest}
            isDisabled={isDisabled}
            isFocused={isFocused}
            isSelected={isSelected}
            getStyles={getStyles}
            innerProps={props}
        >
            <input type="checkbox" checked={isSelected} />
            {children}
        </components.Option>
    );
};

const MultipleSelectWithReactSelectForEdit = ({allOptions, setKey, setValue, selectedVariantForVariant}) => {
    // const [selectedOptions, setSelectedOptions] = useState([]);

    return (
        <div className="App">
            <Select
                defaultValue={selectedVariantForVariant}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={(options) => {
                    if (Array.isArray(options)) {
                        setKey(options.map((opt) => opt.value));
                        setValue(options.map((opt) => opt));
                        // setSelectedOptions(options.map((opt) => opt));
                    }
                }}
                options={allOptions}
                components={{
                    Option: InputOption
                }}
            />
            {/*<pre>{JSON.stringify({ select ed: selectedVariantForVariant }, null, 2)}</pre>*/}
        </div>
    );
};

export default MultipleSelectWithReactSelectForEdit;