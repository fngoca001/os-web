import { Router } from '@angular/router';
import { Cliente } from './../../../../Models/cliente';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/Models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { OS } from 'src/app/Models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacao: '',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []

  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }

  create():void{
    this.service.create(this.os).subscribe(resposta => {
      this.service.massage("Ordem de serviço criada com sucesso!");
      this.router.navigate(['os'])
    })
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }

}
