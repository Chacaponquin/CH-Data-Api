export class WrongUser extends Error {
  constructor() {
    super("Usuario o contraseña incorrecta");
    this.name = "WrongUser";
  }
}
