import React from "react";

const DataListInput = ({
                       label,
                       name,
                       list,
                       placeholder = "",
                       onChange,
                       onKeyPress = null,
                       disabled,
                   }) => {

    return (
        <div className={"input-row"}>

            <label htmlFor={name}>{label}</label>
            <input list={list} name="browser" id="browser"
                   placeholder={placeholder}
                   onChange={onChange}
                   disabled={disabled}
                   onKeyPress={onKeyPress ? onKeyPress : () => {
                   }}>

                <datalist id="browsers">
                    {
                        list.map((item) => {
                            return (`<option value=${item} key=${item}/>`);
                        })
                    }
                </datalist>
            </input>
        </div>
    );
};

export default DataListInput;
