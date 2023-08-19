import React from "react";
import Breadcrumb from "../../../common/breadcrumb";
import CommonSearchComponet from "../../../common/salaryCard/CommonSearchComponet";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import logo from "../../../../assets/images/logo/companyLogo.jpg";

const gridContainer = {
  display: "grid",
  gridTemplateAreas: `
        'EmployeeName Paid Paid Paid Paid Paid Paid Unpaid Unpaid CompensatoryOff CompensatoryOff'
        'EmployeeName CasualLeave CasualLeave SickLeave SickLeave Total Total Absent Absent CompensatoryOff CompensatoryOff'
        'EmployeeName Taken Balance Taken Balance Taken Balance Taken Balance Taken Balance'
      `,
  gap: "10px",
  backgroundColor: "#2196F3",
  padding: "10px",
};

const LeaveReport = () => (
  <Document>
    {/*// style={styles.page style={{ width: '600px'}}}*/}
    <Page
      size="A4"
      style={{ margin: "10px", padding: "0 20px 0 0", marginRight: "20px" }}
    >
      <View style={{ margin: "10px", padding: "10px" }}>
        <View
          style={{
            fontSize: "11px",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ fontSize: "11px" }}>
            <Image src={logo} style={{ width: "50px" }} />
            <View style={{ marginTop: "8px" }}>
              <Text>7/1 (7th Floor), Kabbokash</Text>
              <Text>Kawran Bazar Rd, Dhaka 1215</Text>
            </View>
          </View>
          <View style={{ fontSize: "11px" }}>
            <Text>Report Date</Text>
            <Text>17.08.2023</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <View>
            <Text style={{ fontSize: "16px", margin: "auto" }}>
              Leave Reports
            </Text>
          </View>
        </View>
        <View style={{ marginTop: "10px" }}>
          <View
            style={{
              paddingBottom: "5px",
              borderBottom: "1px dashed gray",
              flexDirection: "row",
              fontSize: "11px",
              fontWeight: "100",
              justifyContent: "space-around",
            }}
          >
            <Text>Date</Text>
            <Text>In Time</Text>
            <Text>Out Time</Text>
            <Text>Late In</Text>
            <Text>Early Out</Text>
            <Text>Over Time</Text>
            <Text>Total Hours</Text>
            <Text>Status</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <Text style={{ fontSize: "10px" }}>No entries found</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const Leave = () => {
  return (
    <>
      <Breadcrumb parent="HRM System" title="Employee Leave Reports" />
      <div className="card" style={{ padding: "20px" }}>
        <CommonSearchComponet />
        <div>
          <div className={gridContainer}>
            <div style={{ gridArea: "EmployeeName" }}>Employee Name</div>
            <div style={{ gridArea: "Paid" }}>Paid</div>
            <div style={{ gridArea: "Unpaid" }}>Unpaid</div>
            <div style={{ gridArea: "CompensatoryOff" }}>Compensatory Off</div>

            <div style={{ gridArea: "EmployeeName" }}>Employee Name</div>
            <div style={{ gridArea: "CasualLeave" }}>Casual Leave</div>
            <div style={{ gridArea: "SickLeave" }}>Sick Leave</div>
            <div style={{ gridArea: "Total" }}>Total</div>
            <div style={{ gridArea: "Absent" }}>Absent</div>
            <div style={{ gridArea: "CompensatoryOff" }}>Compensatory Off</div>

            <div style={{ gridArea: "EmployeeName" }}>Employee Name</div>
            <div style={{ gridArea: "Taken" }}>Taken</div>
            <div style={{ gridArea: "Balance" }}>Balance</div>

            <div style={{ gridArea: "Taken" }}>Taken</div>
            <div style={{ gridArea: "Balance" }}>Balance</div>

            <div style={{ gridArea: "Taken" }}>Taken</div>
            <div style={{ gridArea: "Balance" }}>Balance</div>

            <div style={{ gridArea: "Taken" }}>Taken</div>
            <div style={{ gridArea: "Balance" }}>Balance</div>

            <div style={{ gridArea: "Taken" }}>Taken</div>
            <div style={{ gridArea: "Balance" }}>Balance</div>
          </div>
        </div>

        <div className="table-responsive mt-5">
          <table className="table text-center table-bordered">
            <tbody>
              <tr>
                <td scope="col" className="middle" rowSpan={3}>
                  {"Employee Name"}
                </td>
                <td scope="col" colSpan={6}>
                  {"Paid"}
                </td>
                <td scope="col" colSpan={2}>
                  {"Unpaid"}
                </td>
                <td scope="col" className="middle" colSpan={2} rowSpan={2}>
                  {"Compensatory off"}
                </td>
              </tr>
              <tr>
                <td scope="col" colSpan={2}>
                  {"Casual Leave"}
                </td>
                <td scope="col" colSpan={2}>
                  {"Sick Leave"}
                </td>
                <td scope="col" colSpan={2}>
                  {"Total"}
                </td>
                <td scope="col" colSpan={2}>
                  {"Absent"}
                </td>
              </tr>
              <tr>
                <td scope="col">{"Taken"}</td>
                <td scope="col">{"Balance"}</td>
                <td scope="col">{"Taken"}</td>
                <td scope="col">{"Balance"}</td>
                <td scope="col">{"Taken"}</td>
                <td scope="col">{"Balance"}</td>
                <td scope="col">{"Taken"}</td>
                <td scope="col">{"Balance"}</td>
                <td scope="col">{"Taken"}</td>
                <td scope="col">{"Balance"}</td>
              </tr>
              <tr>
                <td scope="col">{"01"}</td>
                <td scope="col">{"5000"}</td>
                <td scope="col">{"022201"}</td>
                <td scope="col">{"50000"}</td>
                <td scope="col">{"099333"}</td>
                <td scope="col">{"368743"}</td>
                <td scope="col">{"03333"}</td>
                <td scope="col">{"6000000"}</td>
                <td scope="col">{"044484"}</td>
                <td scope="col">{"292933"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leave;
