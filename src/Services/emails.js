import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "appmichef@gmail.com",
        pass: "odhc vkix giur dbjj "
    },
    tls: {
        rejectUnauthorized: true
    }
});

transporter.verify().then(() => {
    console.log("Listo para enviar correos electrónicos.");
});