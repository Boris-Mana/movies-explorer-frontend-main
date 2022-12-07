const IMGURLPREF = 'https://api.nomoreparties.co/';

const CHECKNAMESREGEX = "([а-яА-Яa-zA-Z-ёЁ -]*)";

const CHECKEMAILREGEX = "[a-zA-Zа-яА-Я0-9_]+@[a-zA-Zа-яА-Я0-9_]+.[a-zA-Zа-яА-Я]{2,4}"

const MESSAGEGETMOVERROR = "Во время запроса произошла ошибка.\nВозможно, проблема с соединением или сервер недоступен.\nПодождите немного и попробуйте ещё раз";

const MESSAGENOTHINGFOUND = "Ничего не найдено.\nПопробуйте изменить текст поиска";

const WIDTHBIGSCR = 1280;
const WIDTHSMALLSCR = 768;
const LENGTHBIG = 12;
const LENGTHMIDDLE = 8;
const LENGTHSMALL = 5;

const DURATIONSHORT = 40

export { IMGURLPREF, DURATIONSHORT, CHECKNAMESREGEX, CHECKEMAILREGEX, MESSAGEGETMOVERROR, MESSAGENOTHINGFOUND, WIDTHBIGSCR, WIDTHSMALLSCR, LENGTHBIG, LENGTHMIDDLE, LENGTHSMALL }
