export const usePhoneFormat = () => {
  const formatPhoneNumber = (phone: string | undefined): string => {
    if (!phone) return ''
    const cleaned = phone.replace(/\s+/g, '')
    return cleaned.match(/.{1,2}/g)?.join(' ') || phone
  }

  return { formatPhoneNumber }
}
