import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit{

  id_tec = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(5)])
  telefone = new FormControl('', [Validators.minLength(5)])

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void{
    console.log(this.cliente);
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.massage('Cliente atualizado com sucesso!')
    }, err => {

      if (err.error.error.match('já cadastrado')) {
        this.service.massage(err.error.error)
      } else if (err.error.errors[0].message == "invalid Brazilian individual taxpayer registry number (CPF)") {

        this.service.massage("CPF Inválido!")

      }
    })
  }

  findById():void{
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.cliente = resposta;
      console.log(this.cliente)
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  errrorValidNome() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 50 caracteres!';
    }
    return false;
  }

  errrorValidCPF() {
    if (this.cpf.invalid) {
      return 'O CPF deve ter entre 11 e 15 caracteres!';
    }
    return false;
  }

  errrorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O telefone deve ter entre 11 e 18 caracteres!';
    }
    return false;
  }
}

