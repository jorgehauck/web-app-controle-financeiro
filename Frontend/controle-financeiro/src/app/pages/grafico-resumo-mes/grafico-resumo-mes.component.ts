import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-grafico-resumo-mes',
  templateUrl: './grafico-resumo-mes.component.html',
  styleUrls: ['./grafico-resumo-mes.component.css']
})
export class GraficoResumoMesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.gerarGrafico();
  }

  private gerarGrafico(): void {
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
