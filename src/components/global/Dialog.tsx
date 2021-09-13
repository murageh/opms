//@ts-nocheck
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import TextInput from "./TextInput";
import {addItem} from "../../features/inventory/actions";
import {addSale} from "../../features/sales/actions";
import {addActivity} from "../../features/activity/actions";
import {errorToaster} from "../../helpers/Toaster";
import {addEmployee} from "../../features/employees";

const Dialog = ({
                    onClose, actionText, title, reRender, type,
                    initialEmployee = {}, initialActivity = {},
                    initialItem = {}, initialSale = {},
                    setLoading
                }) => {
    const [employee, setEmployee] = useState(initialEmployee);
    const [activity, setActivity] = useState(initialActivity);
    const [item, setItem] = useState(initialItem);
    const [sale, setSale] = useState(initialSale);
    const dispatch = useDispatch();

    const editEmployeeField = (field) => {
        setEmployee({...employee, ...field});
    };

    const editActivityField = (field) => {
        setActivity({...activity, ...field});
    };

    const editItemField = (field) => {
        setItem({...item, ...field});
    };

    const editSaleField = (field) => {
        setSale({...sale, ...field});
    };

    const blockEvent = (e) => {
        e.stopPropagation();
    };

    const updateX = () => {
        console.log(type)
        if (type === "inventory" || type === "items"){
            dispatch(addItem(item));
        }else if (type === "sale" || type === "sales"){
            dispatch(addSale(sale));
        }else if (type === "activity" || type === "activities"){
            dispatch(addActivity(activity));
        }else if (type === "employee" || type === "employees"){
            dispatch(addEmployee(employee));
        }else {
            errorToaster("Couldn't find operation to perform.")
        }
    }

    const onSubmit = (event) => {
        if (event.key === 'Enter') {
            updateX();
        }
    }

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
                        type === "employee" || type === "employees" ?
                            <EmployeeEditor
                                editUserField={editEmployeeField}
                                user={employee}
                                onSubmit={onSubmit}
                            />
                            : type === "activity" || type === "activities" ?
                                <ActivityEditor
                                    editActivityField={editActivityField}
                                    activity={activity}
                                    onSubmit={onSubmit}
                                />
                                : type === "items" || type === "inventory" ?
                                    <ItemEditor
                                        editItemField={editItemField}
                                        item={item}
                                        onSubmit={onSubmit}
                                    />
                                    : type === "sale" || type === "sales" ?
                                        <SaleEditor
                                            editSaleField={editSaleField}
                                            sale={sale}
                                            onSubmit={onSubmit}
                                        />
                                    : <></>
                    }
                </div>
                <div className={"button-bar"}>
                    <button onClick={onClose}>Cancel</button>
                    <button
                        onClick={() => {
                            updateX();
                        }}
                    >
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmployeeEditor = ({editUserField, user, onSubmit}) => {
    // let {editCouponField, arrays, setArrays, partners, initialPartner} = props;

    return (
        <div className={"editor"}
             onKeyUp={onSubmit}
        >
            <TextInput
                label={"Name"}
                initialValue={user.name ?? ""}
                placeholder={"New name"}
                onChange={(e) => editUserField({name: e.target.value})}
            />

            <TextInput
                label={"Phone"}
                placeholder={"Phone number e.g 0712..."}
                initialValue={user.mobileno ?? ""}
                onChange={(e) => editUserField({mobileno: e.target.value})}
            />

            <TextInput
                label={"Monthly salary"}
                initialValue={user.salary ?? ""}
                placeholder={"Monthly salary"}
                onChange={(e) => editUserField({salary: e.target.value})}
            />

        </div>
    );
}

const ItemEditor = ({editItemField, item, onSubmit}) => {

    return (
        <div className={"editor"}
             onKeyUp={onSubmit}
        >
            <TextInput
                label={"Name"}
                initialValue={item.name ?? ""}
                placeholder={"Item name"}
                onChange={(e) => editItemField({name: e.target.value})}
            />

            <TextInput
                label={"Quantity"}
                type={"number"}
                initialValue={item.quantity ?? ""}
                placeholder={"Item quantity"}
                onChange={(e) => editItemField({quantity: e.target.value})}
            />

            <TextInput
                label={"Total Cost"}
                type={"number"}
                initialValue={item.total_cost ?? ""}
                placeholder={"Item total cost"}
                onChange={(e) => editItemField({total_cost: e.target.value})}
            />

            <TextInput
                label={"Purchased by"}
                type={"text"}
                initialValue={item.courtesy_of ?? ""}
                placeholder={"Purchased by who"}
                onChange={(e) => editItemField({courtesy_of: e.target.value})}
            />


        </div>
    );
}

const ActivityEditor = ({editActivityField, activity, onSubmit}) => {

    return (
        <div className={"editor"}
             onKeyUp={onSubmit}
        >
            <TextInput
                label={"Type"}
                initialValue={activity.type ?? ""}
                placeholder={"Item type"}
                onChange={(e) => editActivityField({type: e.target.value})}
            />

            <TextInput
                label={"Date and time"}
                type={"datetime-local"}
                initialValue={activity.datetime ?? ""}
                placeholder={"Date and time"}
                onChange={(e) => editActivityField({datetime: e.target.value})}
            />

            <TextInput
                label={"Task completed by"}
                type={"text"}
                initialValue={activity.courtesy ?? ""}
                placeholder={"Employee responsible"}
                onChange={(e) => editActivityField({courtesy: e.target.value})}
            />

            <TextInput
                label={"Additional details"}
                type={"text"}
                initialValue={activity.additional_details ?? ""}
                placeholder={"Additional details"}
                onChange={(e) => editActivityField({additional_details: e.target.value})}
            />

        </div>
    );
}

const SaleEditor = ({editSaleField, sale, onSubmit}) => {

    return (
        <div className={"editor"}
             onKeyUp={onSubmit}
        >
            <TextInput
                label={"Sale Type"}
                initialValue={sale.type ?? ""}
                placeholder={"Type of sale e.g. eggs"}
                onChange={(e) => editSaleField({type: e.target.value})}
            />

            <TextInput
                label={"Quantity of items"}
                type={"number"}
                initialValue={sale.quantity ?? ""}
                placeholder={"Quantity of items"}
                onChange={(e) => editSaleField({quantity: e.target.value})}
            />

            <TextInput
                label={"Unit price"}
                type={"number"}
                initialValue={sale.unit_price ?? ""}
                placeholder={"Unit price"}
                onChange={(e) => editSaleField({unit_price: e.target.value})}
            />

            {/*<TextInput*/}
            {/*    label={"Total price"}*/}
            {/*    type={"number"}*/}
            {/*    initialValue={0}*/}
            {/*    value={parseInt(sale.unit_price) * parseInt(sale.quantity)}*/}
            {/*    placeholder={"Total price"}*/}
            {/*    onChange={(e) => editSaleField({total_price: e.target.value})}*/}
            {/*    disabled={true}*/}
            {/*/>*/}

            {/*<TextInput*/}
            {/*    label={"Total discount"}*/}
            {/*    type={"number"}*/}
            {/*    initialValue={sale.total_discount ?? ""}*/}
            {/*    placeholder={"Total discount"}*/}
            {/*    onChange={(e) => editSaleField({total_discount: e.target.value})}*/}
            {/*/>*/}

            <TextInput
                label={"Additional details"}
                type={"text"}
                initialValue={sale.additional_details ?? ""}
                placeholder={"Additional details"}
                onChange={(e) => editSaleField({additional_details: e.target.value})}
            />

        </div>
    );
}

export default Dialog;
