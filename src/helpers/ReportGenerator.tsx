//@ts-nocheck
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import {format} from "date-fns";
import {errorToaster, successToaster} from "./Toaster";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (type, data) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn =
        type === "employees" ? ["Id", "Name", "Phone", "Salary", "Employee since"]
            : type === "activities" ? ["Id", "Activity type", "Performed by", "Date", "Additional info"]
                : type === "inventory" ? ["Id", "Item", "Quantity", "Total Cost", "Added by", "Added on"]
                    : type === "sales" ? ["Id", "Type", "Units sold", "Unit Price", "Total price", "Additional info", "Date"]
                        : ""
    ;

    const title =
        type === "employees" ? "Employee data"
            : type === "activities" ? "Farm activity data"
                : type === "inventory" ? "Inventory data"
                    : type === "sales" ? "Sales data"
                        : ""
    ;

    // define an empty array of rows
    const tableRows = [];

    // for each dataset pass all its data into an array
    if (type === "employees") {
        data.forEach(employee => {
            const employeeData = [
                employee.id,
                employee.name,
                employee.mobileno,
                employee.salary,
                // called date-fns to format the date on the ticket
                format(new Date(employee.date_joined), "dd/MM/yyyy")
            ];
            // push each employee's info into a row
            tableRows.push(employeeData);
        });
    } else if (type === "sales") {
        data.forEach(sale => {
            const saleData = [
                sale.id,
                sale.type,
                sale.quantity,
                sale.unit_price,
                sale.total_price,
                sale.additional_info,
                // called date-fns to format the date on the ticket
                format(new Date(sale.date), "dd/MM/yyyy")
            ];
            // push each employee's info into a row
            tableRows.push(saleData);
        });
    } else if (type === "activities") {
        data.forEach(activity => {
            const activityData = [
                activity.id,
                activity.type,
                activity.courtesy,
                activity.additional_info,
                // called date-fns to format the date on the ticket
                format(new Date(activity.datetime), "dd/MM/yyyy")
            ];
            // push each employee's info into a row
            tableRows.push(activityData);
        });
    } else if (type === "inventory") {
        data.forEach(item => {
            const itemData = [
                item.id,
                item.name,
                item.quantity,
                item.total_cost,
                item.courtesy_of,
                // called date-fns to format the date on the ticket
                format(new Date(item.date_time), "dd/MM/yyyy")
            ];
            // push each employee's info into a row
            tableRows.push(itemData);
        });
    }

    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    const commonText = `This is a list of the ${type}. Generated on ${format(new Date(), "dd/MM/yyyy")}`;
    const footerText = `${date}`;


    // report title. and margin-top + margin-left
    doc.setFontSize(18)
    doc.text("Online Poultry Management System", 14, 22)
    doc.text(doc.splitTextToSize(title, pageWidth - 35, {}), 14, 30)
    doc.setFontSize(11)
    doc.setTextColor(100)

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    let pageSize = doc.internal.pageSize
    let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
    let text = doc.splitTextToSize(commonText, pageWidth - 35, {})
    doc.text(text, 14, 40)

    if (tableRows.length < 1) {
        errorToaster("There's no data. Add some data first, before trying to export.")
        return;
    }

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, {startY: 50, showHead: 'firstPage',});

    //footer
    doc.setFontSize(11)
    doc.text(footerText, 14, doc.lastAutoTable.finalY + 10)

    // we define the name of our PDF file.
    doc.save(`OPMS_${type.toUpperCase()}_Report_${dateStr}.pdf`);

    successToaster(`Your ${type} data has been successfully exported to pdf.`)
};

export default generatePDF;