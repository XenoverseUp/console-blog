import { object, mixed, string, ref } from "yup";

const MAX_FILE_SIZE = 2000000;
const SUPPORTED_FILE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];

export const registerValidationSchema = object().shape({
  userName: string()
    .required()
    .min(2, "Kullanıcı adı 2 karakterden uzun olmalıdır.")
    .max(20, "Kullanıcı adı 20 karakteren uzun olamaz."),
  email: string().required().email("Geçerli bir E-mail giriniz."),
  password: string().required().min(8, "Şifreniz en az 8 karakter olmalıdır"),
  confirmPassword: string()
    .required()
    .oneOf([ref("password"), null], "Şifreler eşleşmiyor."),
});

export const loginValidationSchema = object().shape({
  email: string().required().email("Geçerli bir E-mail giriniz."),
  password: string().required().min(8, "Şifreniz en az 8 karakter olmalıdır"),
});

export const promoteValidationSchema = object().shape({
  email: string().required().email("Geçerli bir E-mail giriniz."),
});

export const editorValidationSchema = object().shape({
  title: string().required().min(6, "Başlık en az 6 karakterden oluşmalı."),
  subtitle: string()
    .required()
    .min(8, "Alt başlık en az 8 karakterden oluşmalı."),
  category: string().required(),
  coverImage: mixed()
    .required()
    .test(
      "fileFormat",
      "Sadece .jpeg, .jpg, veya .png uzantılı dosyalar yükleyebilirsin.",
      (value) =>
        !value.length ? true : SUPPORTED_FILE_FORMATS.includes(value[0].type)
    )
    .test("fileSize", "Kapak fotoğrafı en fazla 2 MB olmalıdır.", (value) =>
      !value.length ? true : value[0].size <= MAX_FILE_SIZE
    ),
  content: string()
    .required("İçerik bölümü boş olamaz.")
    .min(500, "Yazın biraz daha uzun olmalı."),
});

export const commentValidationSchema = object().shape({
  content: string().required(),
});
