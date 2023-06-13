import { DonacionesService } from './../../../../service/donaciones.service';
import { Component, OnInit } from '@angular/core';
import { CompetenciasService } from 'src/app/demo/service/competencias.service';
import { InformeService } from 'src/app/demo/service/informe.service';
import { ProyectosService } from 'src/app/demo/service/proyectos.service';
import { TendenciasService } from 'src/app/demo/service/tendencias.service';

@Component({
    selector: 'app-graficas',
    templateUrl: './graficas.component.html',
    styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent implements OnInit {
    barData: any;
    barDataMap: any;
    barOptions: any;
    lineData: any;
    lineOptions: any;
    proyectos: any[] = [];
    donaciones: any;
    totalDonaciones: any;
    informeAnalisis: any;
    cantidadProyectosCat: any;
    labelBar: string = '';
    pieData: any;
    pieOptions: any;

    constructor(
        private informeService: InformeService,
        private proyectosService: ProyectosService,
        private donacionesService: DonacionesService,
        private competenciaService: CompetenciasService,
        private tendenciaService: TendenciasService
    ) {}
    ngOnInit(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

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
                    organizationName: item.organizacionNombre,
                };
            });

            this.cantidadProyectosCat = this.proyectos.filter(
                (x) => x.category == this.proyectos[0]?.category
            );
        });

        this.donacionesService.getDonaciones().subscribe((data) => {
            this.totalDonaciones = data.reduce(
                (a, b) => a + b.cantidadDonada,
                0
            );

            this.donaciones = data.map((item) => {
                return {
                    id: item.id,
                    nameDonor: item.donanteNombre,
                    quantityDonnor: item.cantidadDonada,
                    date: item.fecha,
                    projectId: item.proyectoId,
                };
            });
        });

        this.informeService.getInforme().subscribe((data) => {
            this.informeAnalisis = data.map((item) => {
                return {
                    id: item.id,
                    channel: item.canal,
                    donacionesTotales: item.donacionesTotales,
                    proyecto: {
                        titulo: item.proyecto?.titulo,
                    },
                };
            });
        });

        const DEFAULT_COLORS = [
            '#3366CC',
            '#DC3912',
            '#FF9900',
            '#109618',
            '#990099',
            '#3B3EAC',
            '#0099C6',
            '#DD4477',
            '#66AA00',
            '#B82E2E',
            '#316395',
            '#994499',
            '#22AA99',
            '#AAAA11',
            '#6633CC',
            '#E67300',
            '#8B0707',
            '#329262',
            '#5574A6',
            '#3B3EAC',
        ];

        this.tendenciaService.getTendencias().subscribe((data) => {
            const dataFromData = data.map((item) =>
                parseInt(item.crecimientoMercado)
            );
            const backgroundColors = DEFAULT_COLORS.slice(
                0,
                data.length % DEFAULT_COLORS.length
            );
            const hoverColors = DEFAULT_COLORS.slice(
                1,
                ((data.length + 1) % DEFAULT_COLORS.length) + 1
            );

            this.pieData = {
                labels: data.map((item) => item.tamanoMercado),
                datasets: [
                    {
                        data: dataFromData,
                        backgroundColor: backgroundColors,
                    },
                ],
            };
        });

        this.competenciaService.getCompetencias().subscribe((data) => {
            this.barDataMap = data.map((obj) => {
                return {
                    label: obj.nombre,
                    data: [obj.producto],
                };
            });

            const bar = data.map((obj, index) => {
                const dataArray = Array(index).fill(0);
                dataArray.push(obj.analisisPrecios);

                return {
                    label: '',
                    backgroundColor:
                        DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                    borderColor: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                    data: dataArray,
                };
            });
            this.barData = {
                labels: this.barDataMap.map((x: any) => x.label),
                datasets: bar,
            };

            this.labelBar = data[0]?.producto;
        });

        this.barData = {};

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor,
                    },
                },
            },
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }
}
