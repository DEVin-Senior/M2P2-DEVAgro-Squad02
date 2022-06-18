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
import { CompanyService } from 'src/app/_services/company/company.service';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';

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
  totalPropertiesInstalled: any;
  totalEmployees: any;
  grain: any = [];
  grainsHigherStocks: any = [];
  amountGrainCharts: number = 4;

  ngOnInit(): void {
    this.totalFarmCompanyLoggedIn();
  }

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions!: Partial<ChartOptions>;

  constructor(private farmService: FarmService, private companyService: CompanyService, private employeeService: EmployeeService) {
    this.getConfigDefaultChart();
  }



  totalFarmCompanyLoggedIn() {
    try {
      this.farmService.getAllfarmCompanyLoggedIn(this.companyService.getIdCompanyLoggedIn()).subscribe(data => this.totalPropertiesInstalled = data);
    } catch (error) {
      this.totalPropertiesInstalled = 0;
    }
    this.totalEmployeeCompanyLoggedIn();
  }


  totalEmployeeCompanyLoggedIn() {
    try {
      this.employeeService.getTotalEmployeesCompanyLoggedIn(this.companyService.getIdCompanyLoggedIn()).subscribe(data => this.totalEmployees = data);
    } catch (error) {
      this.totalEmployees = 0;
    }
    this.totalgrainCompanyLoggedIn();
  }

  totalgrainCompanyLoggedIn() {
    try {
      this.farmService.getAllgrainCompanyLoggedIn(this.companyService.getIdCompanyLoggedIn()).subscribe((data) => {
        this.grain = data;
        this.getGraingraphic(this.amountGrainCharts);
      });
    } catch (error) {
      this.grain = 0;
    }
  }

  getGraingraphic(amountItemsChart: number) {
    const resultSort = Array.isArray(this.grain) ? this.grain.sort((a: { stock: number; }, b: { stock: number; }) => {
      if (a.stock > b.stock) return -1;
      if (a.stock < b.stock) return 1;
      return 0;
    }) : [];

    for (let index = 0; index < resultSort.length; index++) {
      if (this.grainsHigherStocks.length >= amountItemsChart) {
        return
      } else {
        this.grainsHigherStocks.push(resultSort[index]);
      }
    }
    this.setChartOptionsData();
  }

  setChartOptionsData() {
    this.getConfigDefaultChart();
    for (let index = 0; index < this.grainsHigherStocks.length; index++) {
      this.chartOptions.xaxis.categories.push(this.grainsHigherStocks[index].name.substring(0, 10));
      this.chartOptions.series[0].data.push(this.grainsHigherStocks[index].stock);
    }
  }

  getConfigDefaultChart() {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: []
        }
      ],
      chart: {
        height: 142,
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



