import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  yaxis: any;
  xaxis: any;
  grid: any;
  colors: any;
  legend: any;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuName: string = 'Início';

  ngOnInit(): void {
  }

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Grão - Toneladas",
          data: [250, 500, 750, 1000]
        }
      ],
      chart: {
        height: 150,
        type: "bar",
        events: {
          // click: function (chart, w, e) {
          //   // console.log(chart, w, e)
          // }
        }
      },
      colors: [
        "#02600a"
      ],
      plotOptions: {
        bar: {
          columnWidth: "80%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["Arroz"],
          ["Feijão"],
          ["Milho"],
          ["Soja"]
        ],
        labels: {
          style: {
            colors: [
            ],
            fontSize: "0.8rem"
          }
        }
      }
    };
  }
}
