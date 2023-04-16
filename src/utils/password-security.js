import bcrypt from "bcrypt";
// ecnriptar la contraseña al guardar
export const encryptPassword = async (password) => {
  const encriptar = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, encriptar);
};
// comparar contraseñas
export const comparePassword=async(newPassword,passwordUser)=>{
  return await bcrypt.compare(newPassword,passwordUser);
}