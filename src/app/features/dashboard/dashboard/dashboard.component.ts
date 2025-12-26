import { AfterViewInit, Component } from '@angular/core';
declare var ApexCharts: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit {
ngAfterViewInit(): void {
    this.loadCharts();
  }

  loadCharts() {

    // PIE - Today
    new ApexCharts(document.querySelector("#pieToday"), {
      chart: { type: 'pie', height: 250 },
      series: [80, 20],
      labels: ['Civil', 'Criminal'],
      colors: ['#28a745', '#007bff']
    }).render();

    // PIE - Next 7 Days
    new ApexCharts(document.querySelector("#pieNext7"), {
      chart: { type: 'pie', height: 250 },
      series: [65, 20, 15],
      labels: ['High Court', 'Supreme Court', 'District Court'],
      colors: ['#ff851b', '#007bff', '#2ecc71']
    }).render();

    // LINE
    new ApexCharts(document.querySelector("#lineChart"), {
      chart: { type: 'line', height: 300 },
      series: [{
        name: 'Cases',
        data: [10, 15, 30, 18, 22, 35, 28, 40, 21, 17, 25]
      }],
      xaxis: {
        categories: ['Day1','Day2','Day3','Day4','Day5','Day6','Day7','Day8','Day9','Day10','Day11']
      }
    }).render();

    // BAR
    new ApexCharts(document.querySelector("#barChart"), {
      chart: { type: 'bar', height: 300 },
      series: [{
        name: 'Cases',
        data: [120, 340, 180, 90, 220]
      }],
      xaxis: {
        categories: ['HC', 'DC', 'Sessions', 'Family', 'Special']
      }
    }).render();
  }
}
