//@ts-nocheck
import React from "react";
import {useDispatch} from "react-redux";

const ImageViewer = ({
                    onClose, title, type="wider",
                    imagePath
                     }) => {
    useDispatch();
    const blockEvent = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={"overlay"} onClick={onClose}>
            <div
                className={
                    //dialog-special class gives the dialog a bigger width.
                    // useful for entries that might look cluttered on narrow input fields
                    type === "wider"
                        ? "dialog diag-special"
                        : "dialog"
                }
                onClick={blockEvent}
            >
                <p>{title}</p>
                <div className={"dialog-body"}>
                    {
                       <img src={`http://127.0.0.1/opms/database/${imagePath}`} alt={"sale_image"}/>
                    }
                </div>
                <div className={"button-bar"}>
                    <button onClick={onClose}>Close view</button>
                    {/*<button*/}
                    {/*    onClick={() => {*/}
                    {/*        updateX();*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {actionText}*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
