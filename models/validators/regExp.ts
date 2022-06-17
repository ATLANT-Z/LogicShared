export const trimmedRegExp = new RegExp(/^[^ ]+[.]*[^ ]+$/);
export const noSpacesRegExp = new RegExp(/^[ ]*\S*[ ]*$/);

//eslint-disable-next-line
export const emailRegExp = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const passwordRegExp = new RegExp(/^(?=.*\d)(?![.\n])(?=.*[A-ZА-ЯË])(?=.*[a-zа-яё]).*$/);
export const password3digitInARowRegExp = new RegExp(/^(?!.*(\d)\1{2}).*$/);

export const urlRegExp = new RegExp(/^(http|https):\/\/([A-ZА-ЯË0-9][A-ZА-ЯË0-9_-]*(?:\.[A-ZА-ЯË0-9][A-ZА-ЯË0-9_-]*)+):?(\d+)?\/?/iu);

export const usreouRegExp = new RegExp(/^\d{8}$/);
export const tinRegExp = new RegExp(/^\d{10}$/);
