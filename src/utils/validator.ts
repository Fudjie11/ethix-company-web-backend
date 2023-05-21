export const isEmail = (email: string) => {
  const parseEmail = email.split('@')
  if (parseEmail.length !== 2) {
    return false;
  }

  const parseDomain = parseEmail[1].split('.')
  if (parseDomain.length === 1) {
    return false
  }

  const invalidDomain = ['comm']
  if (invalidDomain.indexOf(parseDomain[1]) >= 0) {
    return false
  }

  return true
}