/**
 * @description Internal validator that matches the "name" property in the "SingleFakeUser" schema (`api/schema.yml`).
 */
export function validateName(name: string) {
  if (name && name.match(/^[\w\-\s]{4,30}$/) && name.length >= 4 && name.length <= 30) return true;
  else return false;
}

/**
 * @description Internal validator that matches the "image" property in the "SingleFakeUser" schema (`api/schema.yml`).
 */
export function validateImage(image: string) {
  if (image && image.match(/^[\w\-\.\/:]*$/gi) && image.length >= 10 && image.length <= 100)
    return true;
  else return false;
}

/**
 * @description Internal validator that matches the "id" property in the "SingleFakeUser" schema (`api/schema.yml`).
 */
export function validateId(id: string) {
  if (id && id.match(/^[\w\-]*$/gi) && id.length >= 8 && id.length <= 40) return true;
  else return false;
}

/**
 * @description Internal validator that matches the "email" property in the "SingleFakeUser" schema (`api/schema.yml`).
 */
export function validateEmail(email: string) {
  if (
    email &&
    email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    email.length >= 4 &&
    email.length <= 30
  )
    return true;
  else return false;
}
