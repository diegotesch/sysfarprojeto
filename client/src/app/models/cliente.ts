
export class Cliente {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public telefone?: string,
    public idade?: number,
    public data_nascimento?: Date
  ) {}
}
