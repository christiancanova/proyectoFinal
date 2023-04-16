class UserDto {
    constructor(user) {
      this.uid = user._id;
      this.name = user.firstname;
      this.email = user.email;
      this.phone = user.phone;
    }
  }
  // comprobar si es un array de datos o no y devolver el producto mostrando los campos que se requieran
  export const userDto = (users) => {   
    if (Array.isArray(users)) {
      return users.map((user) => new UserDto(user));
    } else {
      return new UserDto(users);
    }
  };