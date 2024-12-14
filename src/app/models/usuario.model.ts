export interface Usuario {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    birthdate: Date,
    perfil: String,
 };