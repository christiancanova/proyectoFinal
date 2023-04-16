import nodemailer from "nodemailer";
import ejs from "ejs";

export const sendMailOrderUser = async (order) => {
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
    const templateOrderUser = await ejs.renderFile(
      "src/views/templateOrderUser.ejs",
      {order}
    );
    //opciones email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: order.email,
      subject: `InfoWeb - Su compra fue realizada correctamente - Nro de Orden: ${order.numOrder}`,
      html: templateOrderUser,
    };
    // enviar email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};