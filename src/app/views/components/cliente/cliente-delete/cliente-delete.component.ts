import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../../../../Models/cliente';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {


  id_tec = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }


  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.cliente = resposta;
      console.log(this.cliente)
    })
  }

  delete():void{
    this.service.delete(this.id_tec).subscribe(resposta => {
      this.router.navigate(['clientes'])
      this.service.massage('Cliente deletado com sucesso!')
    }, err => {
      if(err.error.error.match('possui Ordens de serviço')){
        this.service.massage(err.error.error)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }
}

