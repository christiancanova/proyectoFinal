import User from "../models/User.js";
import { userDto } from "../dtos/userDto.js";

export default class UserDao {
  constructor() {
    this.model = User;
  }
  saveUser = async (user) => {
    //crear nuevos usuarios
    try {
      const newUser = new this.model(user);
      await newUser.save();
      return userDto(newUser);
    } catch (error) {
      throw new Error("Error al guardar el usuario", error);
    }
  };
  getUserByEmail = async (email) => {
    //buscar usuario por email
    try {
      const user = await this.model.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Error al buscar el usuario", error);
    }
  };
}