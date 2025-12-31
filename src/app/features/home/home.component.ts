import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadPieTodaychartData();
    this.loadPienext7DaysChartData();
    this.loadLineChart();
    this.loadBarChart();
  }
  // loadPieChartData() {
  //   this.http.get<any>('https://api.example.com/sales-data').subscribe(data => {
  //     const labels = data.map((item: any) => item.category); // e.g., "Electronics", "Clothing"
  //     const values = data.map((item: any) => item.value); // e.g., 200, 150

  //     new Chart('revenueChart', {
  //       type: 'pie',
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: 'Sales Value',
  //           data: values,
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.6)',
  //             'rgba(54, 162, 235, 0.6)',
  //             'rgba(255, 206, 86, 0.6)',
  //             'rgba(75, 192, 192, 0.6)',
  //             'rgba(153, 102, 255, 0.6)'
  //           ]
  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             position: 'right'
  //           },
  //           tooltip: {
  //             callbacks: {
  //               label: function(context) {
  //                 return `${context.label}: ${context.parsed}`;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     });

  //   });
  // }
  loadPienext7DaysChartData() {
  // Static data
  const labels = ['Electronics', 'Clothing', 'Furniture', 'Toys', 'Books'];
  const values = [200, 150, 100, 75, 50];

  new Chart('next7DaysChart', {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales Value',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}`;
            }
          }
        }
      }
    }
  });
}
 loadPieTodaychartData() {
  // Static data
  const labels = ['Electronics', 'Clothing', 'Furniture', 'Toys', 'Books'];
  const values = [200, 150, 100, 75, 50];

  new Chart('Todaychart', {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales Value',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}`;
            }
          }
        }
      }
    }
  });
}

loadLineChart() {
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dataValues = [12, 19, 3, 5, 2, 3, 7]; // static values

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Last 30 days Cases',
          data: dataValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  loadBarChart() {
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dataValues = [12, 19, 3, 5, 2, 3, 7]; // static values

  new Chart('barChart', {
    type: 'bar', // changed to bar
    data: {
      labels: labels,
      datasets: [{
        label: 'Ongoing Cases',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // bar fill color
        borderColor: 'rgba(54, 162, 235, 1)',       // bar border color
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // use CSS height
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

}
