import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ResumoMesService } from 'src/app/services/resumo-mes/resumo-mes.service';



@Component({
  selector: 'app-grafico-resumo-mes',
  templateUrl: './grafico-resumo-mes.component.html',
  styleUrls: ['./grafico-resumo-mes.component.css']
})
export class GraficoResumoMesComponent implements OnInit {

  constructor(private resumoMesService: ResumoMesService)
  { }

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
          borderWidth: 2
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
