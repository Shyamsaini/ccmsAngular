import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HomeService } from '../../core/services/home.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  todayHearing: any[] = [];
  next7DaysHearing: any[] = [];
  summary: any = {};
  constructor(private http: HttpClient, private dashboardService: HomeService) {
    Chart.register(...registerables);
  }

  // async ngOnInit(): void {
  //   this.loadPieTodaychartData();
  //   this.loadPienext7DaysChartData();
  //   this.loadLineChart();
  //   this.loadBarChart();
  // }
async ngOnInit(): Promise<void> {
  await Promise.all([
    this.loadPieTodaychartData(),
    this.loadPienext7DaysChartData(),
    this.loadLineChart(),
    this.loadBarChart(),
    this.summary = (await firstValueFrom(this.dashboardService.getDashboard(6)))?.data?.summary
  ]);
}


async loadPieTodaychartData() {
  const res = await firstValueFrom(this.dashboardService.getDashboard(6));

  if (res.isSuccess) {
    this.todayHearing = res.data.todayHearing;

    const labels = this.todayHearing.map(x => x.court);
    const values = this.todayHearing.map(x => x.cnt);

    Chart.getChart('Todaychart')?.destroy();

    new Chart('Todaychart', {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Today Hearing',
          data: values,
          backgroundColor: [
            'rgba(255,99,132,0.6)',
            'rgba(54,162,235,0.6)',
            'rgba(255,206,86,0.6)',
            'rgba(75,192,192,0.6)',
            'rgba(153,102,255,0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed}`
            }
          }
        }
      }
    });
  }
}

async loadPienext7DaysChartData() {
  const res = await firstValueFrom(this.dashboardService.getDashboard(6));

  if (res.isSuccess) {
    this.next7DaysHearing = res.data.next7DaysHearing;

    const labels = this.next7DaysHearing.map(x => x.court);
    const values = this.next7DaysHearing.map(x => x.cnt);

    Chart.getChart('next7DaysChart')?.destroy();

    new Chart('next7DaysChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Next 7 Days Hearing',
          data: values,
          backgroundColor: [
            'rgba(255,99,132,0.6)',
            'rgba(54,162,235,0.6)',
            'rgba(255,206,86,0.6)',
            'rgba(75,192,192,0.6)',
            'rgba(153,102,255,0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed}`
            }
          }
        }
      }
    });
  }
}
async loadBarChart() {
  const res = await firstValueFrom(this.dashboardService.getDashboard(6));

  if (res.isSuccess) {
    const courtWiseCases = res.data.courtWiseCases;

    const labels = courtWiseCases.map((x: { court: any; }) => x.court);
    const values = courtWiseCases.map((x: { totalCases: any; }) => x.totalCases);

    Chart.getChart('barChart')?.destroy();

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Court-wise Cases',
          data: values,
          backgroundColor: '#00c0ef'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 60,
              minRotation: 45,
              autoSkip: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Cases'
            }
          }
        }
      }
    });
  }
}


async loadLineChart() {
  const res = await firstValueFrom(this.dashboardService.getDashboard(6));
  if (res.isSuccess) {
    const casesByDate = res.data.casesByDate;

    const labels = casesByDate.map((x: { caseEntryDate: string | number | Date; }) =>
      new Date(x.caseEntryDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short'
      })
    );

    const dataValues = casesByDate.map((x: { cases: any; }) => x.cases);

    Chart.getChart('lineChart')?.destroy();

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Last 30 Days Cases',
          data: dataValues,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: { beginAtZero: true },
          x: { title: { display: true, text: 'Date' } }
        }
      }
    });
  }
}


//   loadPienext7DaysChartData() {
//     this.dashboardService.getDashboard(6).subscribe(res => {
//       if (res.isSuccess) {

//         this.next7DaysHearing = res.data.next7DaysHearing;

//         const labels = this.next7DaysHearing.map(x => x.court);
//         const values = this.next7DaysHearing.map(x => x.cnt);

//         // Destroy chart if already exists (important)
//         Chart.getChart('next7DaysChart')?.destroy();

//         new Chart('next7DaysChart', {
//           type: 'pie',
//           data: {
//             labels: labels,
//             datasets: [{
//               label: 'Next 7 Days Hearing',
//               data: values,
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(75, 192, 192, 0.6)',
//                 'rgba(153, 102, 255, 0.6)'
//               ]
//             }]
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'right'
//               },
//               tooltip: {
//                 callbacks: {
//                   label: (context) => `${context.label}: ${context.parsed}`
//                 }
//               }
//             }
//           }
//         });
//       }
//     });
//   }

//   loadPieTodaychartData() {
//     this.dashboardService.getDashboard(6).subscribe(res => {
//       if (res.isSuccess) {
//         this.todayHearing = res.data.todayHearing;
//         const labels = this.todayHearing.map(x => x.court);
//         const values = this.todayHearing.map(x => x.cnt);
//         new Chart('Todaychart', {
//           type: 'pie',
//           data: {
//             labels: labels,
//             datasets: [{
//               label: 'Sales Value',
//               data: values,
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(75, 192, 192, 0.6)',
//                 'rgba(153, 102, 255, 0.6)'
//               ]
//             }]
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'right'
//               },
//               tooltip: {
//                 callbacks: {
//                   label: function (context) {
//                     return `${context.label}: ${context.parsed}`;
//                   }
//                 }
//               }
//             }
//           }
//         });
//       }
//     });
//   }

//   loadLineChart() {
//   this.dashboardService.getDashboard(6).subscribe(res => {
//     if (res.isSuccess) {

//       const casesByDate = res.data.casesByDate;

//       // X-axis labels (dates)
//       const labels = casesByDate.map((x: any) =>
//         new Date(x.caseEntryDate).toLocaleDateString('en-IN', {
//           day: '2-digit',
//           month: 'short'
//         })
//       );

//       // Y-axis values (cases)
//       const dataValues = casesByDate.map((x: any) => x.cases);

//       // Destroy previous chart (important)
//       Chart.getChart('lineChart')?.destroy();

//       new Chart('lineChart', {
//         type: 'line',
//         data: {
//           labels: labels,
//           datasets: [{
//             label: 'Last 30 Days Cases',
//             data: dataValues,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             tension: 0.4,
//             pointRadius: 4,
//             pointHoverRadius: 6
//           }]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { position: 'top' },
//             tooltip: {
//               callbacks: {
//                 label: (context) =>
//                   `Cases: ${context.parsed.y}`
//               }
//             }
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               title: {
//                 display: true,
//                 text: 'Number of Cases'
//               }
//             },
//             x: {
//               title: {
//                 display: true,
//                 text: 'Date'
//               }
//             }
//           }
//         }
//       });
//     }
//   });
// }

// loadBarChart() {
//   this.dashboardService.getDashboard(6).subscribe(res => {
//     if (res.isSuccess) {

//       const courtWiseCases = res.data.courtWiseCases;

//       const labels = courtWiseCases.map((x: any) => x.court);
//       const dataValues = courtWiseCases.map((x: any) => x.totalCases);

//       Chart.getChart('barChart')?.destroy();

//       new Chart('barChart', {
//         type: 'bar',
//         data: {
//           labels,
//           datasets: [{
//             label: 'Court-wise Cases',
//             data: dataValues,
//             backgroundColor: '#00c0ef'
//           }]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { display: false },
//             tooltip: {
//               callbacks: {
//                 label: ctx => `Cases: ${ctx.parsed.y}`
//               }
//             }
//           },
//           scales: {
//             x: {
//               ticks: {
//                 maxRotation: 60,
//                 minRotation: 45,
//                 autoSkip: false,
//                 font: { size: 11 }
//               }
//             },
//             y: {
//               beginAtZero: true,
//               title: {
//                 display: true,
//                 text: 'Number of Cases'
//               }
//             }
//           }
//         }
//       });
//     }
//   });
// }


}
