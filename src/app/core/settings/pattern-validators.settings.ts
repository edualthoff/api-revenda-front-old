
/**
 * ^ - início da string (implícito no padrão string regex)
 *   - (?=\D*\d) - deve haver 1 dígito
 *    - (?=[^a-z]*[a-z]) - deve haver 1 letra ASCII minúscula
 *    - (?=[^A-Z]*[A-Z]) - deve haver 1 letra ASCII maiúscula --- Desativado
 *    - .{8,30} - quaisquer 8 a 30 caracteres, exceto caracteres de quebra de linha
 *   - $ - fim da string (implícito no padrão string regex).
 */
export const patternPassword = /^(?=\D*\d)(?=[^a-z]*[a-z]).{8,30}$/;
