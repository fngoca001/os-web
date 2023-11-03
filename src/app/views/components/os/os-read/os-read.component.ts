import { ClienteService } from './../../../../services/cliente.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/Models/os';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  listaOs: OS[] = []

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.listaOs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.status != "ENCERRADO"){
          this.listaOs.push(x)
        }
      })
      this.listarTecnicos();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.listaOs);
      this.dataSource.paginator = this.paginator;
    })
  }

  navegateToCreate(): void {
    this.router.navigate(['os/create'])
  }

  listarTecnicos():void{
    this.listaOs.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome
      })
    })
  }

  listarCliente():void{
    this.listaOs.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(resposta => {
        x.cliente = resposta.nome
      })
    })
  }

  prioridade(x : any){
    if(x == 'BAIXA'){
      return 'baixa'
    }else if(x == 'MEDIA'){
      return 'media'
    }else{
      return 'alta'
    }
  }
}

