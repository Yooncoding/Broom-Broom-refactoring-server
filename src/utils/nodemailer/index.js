import nodemailer from "nodemailer";
import config from "../../config";

const generateKey = function () {
  return Math.random().toString().substr(2, 6);
};
const generatePwd = function () {
  return Math.random().toString(36).substr(2, 8);
};

const transporter = nodemailer.createTransport(config.mailOption);

const sendKeyByEmail = async function (email, key) {
  await transporter.sendMail({
    from: "부름부름 인증관리자",
    to: email,
    subject: "<부름부름> 회원가입을 위한 이메일 인증번호입니다.",
    html: `
    <p style='color:black'>회원 가입을 위한 인증번호 입니다.</p>
    <p style='color:black'>아래의 인증 번호를 입력하여 인증을 완료해주세요.</p>
    <h2>${key}</h2>
    `,
  });
};

const sendPwdByEmail = async function (email, name, pwd) {
  await transporter.sendMail({
    from: "부름부름 인증관리자",
    to: email,
    subject: `<부름부름> ${name}님의 임시 비밀번호입니다.`,
    html: `
    <p style='color:black'>${name}님의 임시 비밀번호입니다.</p>
    <p style='color:black'>아래의 새로 발급된 임시 비밀번호를 입력하여 로그인 해주세요.</p>
    <h2>${pwd}</h2>
    `,
  });
};

export { generateKey, sendKeyByEmail, generatePwd, sendPwdByEmail };
