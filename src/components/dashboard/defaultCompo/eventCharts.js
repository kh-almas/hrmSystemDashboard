import React, { Fragment } from "react";
import { DollarSign, Tag, ShoppingBag, Sun } from "react-feather";
import CountUp from "react-countup";
import Chart from "react-apexcharts";
import { gradientChart1, gradientChart2, gradientChart3, gradientChart4, gradientChartData, gradientChartOptions } from "../../../data/default";
import configDB from "../../../data/customizer/config";
import { TotalVisits, TotalSale, TotalValue, TotalTax, TotalEarning, ProductionValuation } from "../../../constant";
import { Line } from "react-chartjs-2";
const primary = localStorage.getItem("primary_color") || configDB.data.color.primary_color;
const secondary = localStorage.getItem("secondary_color") || configDB.data.color.secondary_color;

const EventCharts = () => {
  return (
    <Fragment>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="chart-widget-dashboard">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="mt-0 mb-0 f-w-600">
                    <DollarSign />
                    <span>
                      <CountUp className="counter" end={5789} />
                    </span>
                  </h5>
                  <p>{TotalVisits}</p>
                </div>
                <Tag />
              </div>
              <div className="dashboard-chart-container">
                <div className="small-chart-gradient-1">
                  <Chart options={gradientChart1.options} series={gradientChart1.series} height="100" type="area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="chart-widget-dashboard">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="mt-0 mb-0 f-w-600">
                    <DollarSign />
                    <span>
                      <CountUp className="counter" end={4986} />
                    </span>
                  </h5>
                  <p>{TotalSale}</p>
                </div>
                <ShoppingBag />
              </div>
              <div className="dashboard-chart-container">
                <div className="small-chart-gradient-1">
                  <Chart options={gradientChart2.options} series={gradientChart2.series} height="100" type="area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="chart-widget-dashboard">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="mt-0 mb-0 f-w-600">
                    <DollarSign />
                    <span>
                      <CountUp className="counter" end={8568} />
                    </span>
                  </h5>
                  <p>{TotalValue}</p>
                </div>
                <Sun />
              </div>
              <div className="dashboard-chart-container">
                <div className="small-chart-gradient-1">
                  <Chart options={gradientChart3.options} series={gradientChart3.series} height="100" type="area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5>{ProductionValuation}</h5>
          </div>
          <div className="card-body">
            <div className="show-value-top d-flex">
              <div className="value-left d-inline-block">
                <div className="square bg-primary d-inline-block"></div>
                <span>{TotalEarning}</span>
              </div>
              <div className="value-right d-inline-block">
                <div className="square d-inline-block bg-secondary"></div>
                <span>{TotalTax}</span>
              </div>
            </div>
            <div className="smooth-chart flot-chart-container">
              <Line data={gradientChartData} options={gradientChartOptions} height="360" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventCharts;
