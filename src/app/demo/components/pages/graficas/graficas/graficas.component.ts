import { DonacionesService } from './../../../../service/donaciones.service';
import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/demo/service/proyectos.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
    barData: any;
    barOptions: any;
    lineData: any;
    lineOptions: any;
    proyectos: any;
    donaciones: any;
    totalDonaciones: any;

    constructor(private proyectosService: ProyectosService, private donacionesService: DonacionesService) {

    }
ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.proyectosService.getProyectos().subscribe((data) => {

        this.proyectos = data.map((item) => {
            return {
                id: item.id,
                title: item.titulo,
                location: item.ubicacion,
                category: item.categoria,
                startDate: item.fechaInicio,
                endDate: item.fechaFinalizacion,
                budget: item.presupuesto,
                organizationID: item.organizacionId,
                organization: item.organizacion,
                organizationName: item.organizacionNombre
            }
        });
    })

    this.donacionesService.getDonaciones().subscribe((data) => {
        this.totalDonaciones =  data.reduce((a, b) => a + b.cantidadDonada, 0)


        this.donaciones = data.map((item) => {
            return {
                id: item.id,
                nameDonor: item.donanteNombre,
                quantityDonnor: item.cantidadDonada,
                date: item.fecha,
                projectId: item.proyectoId
            }
        });
    })




    this.barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    this.barOptions = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
        }
    };

    this.lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                borderColor: documentStyle.getPropertyValue('--primary-500'),
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                tension: .4
            }
        ]
    };

    this.lineOptions = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
        }
    };
}



}
