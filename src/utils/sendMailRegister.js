import nodemailer from "nodemailer";
import ejs from "ejs";

//configurar email de envio cuando se registra un nuevo usuario
export const sendMailRegister = async (user) => {
  // conexión al SMTP del envio de emails
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    // enviar datos el template del email de registro de usuario
    const { firstname, lastname, email, phone } = user;
    const templateUser = await ejs.renderFile("src/views/templateUser.ejs", {
      firstname,
      lastname,
      email,
      phone,
    });
    //opciones email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_FROM,
      subject: `InfoWeb - Nuevo usuario Registrado - Email: ${email}`,
      html: templateUser,
    };
    // enviar email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};