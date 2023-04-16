import nodemailer from "nodemailer";
import ejs from "ejs";

export const sendMailOrderAdmin = async (order) => {
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
    // enviar datos al template de orden de compra del administrador
    const templateOrderAdmin = await ejs.renderFile(
      "src/views/templateOrderAdmin.ejs",
      {order}
    );
    //opciones email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_FROM,
      subject: `InfoWeb - Nueva Compra realizada - Nro de Orden: ${order.numOrder}`,
      html: templateOrderAdmin,
    };
    // enviar email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};