import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "sebasch04@gmail.com", // Reemplaza con tu correo de Gmail
        pass: "dipb zkyy rjce fspd", // Reemplaza con la contraseña de aplicación que generaste
    },
    tls: {
        rejectUnauthorized: true
    }
});

transporter.verify().then(() => {
    console.log("Ready to send emails");
});