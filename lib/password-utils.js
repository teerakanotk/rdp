export const randomPassword = (length) => {
  const upper = "ABCDEFGHJKLMNPQRTUVWXYZ"; // no O, I, S
  const lower = "abcdefghijkmnopqrstuvwxyz"; // no l
  const digit = "2346789"; // no 0, 1, 5
  const special = "@#";

  const pool = [...upper, ...lower, ...digit];
  const used = new Set();

  // To track case-insensitive usage (e.g. 'x' and 'X' conflict)
  const usedInsensitive = new Set();

  const getUniqueChar = (chars) => {
    let char;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      char = chars[Math.floor(Math.random() * chars.length)];
      attempts++;
      if (attempts > maxAttempts) return null; // Avoid infinite loop
    } while (used.has(char) || usedInsensitive.has(char.toLowerCase()));

    used.add(char);
    usedInsensitive.add(char.toLowerCase());
    return char;
  };

  const firstChar = getUniqueChar([...upper, ...lower]);
  const oneUpper = getUniqueChar(upper);
  const oneLower = getUniqueChar(lower);
  const oneDigit = getUniqueChar(digit);
  const oneSpecial = getUniqueChar(special);

  let passwordChars = [oneUpper, oneLower, oneDigit, oneSpecial];

  while (passwordChars.length < length - 1) {
    const available = pool.filter(
      (c) => !used.has(c) && !usedInsensitive.has(c.toLowerCase())
    );
    if (available.length === 0) break;

    const newChar = getUniqueChar(available);
    if (!newChar) break;

    passwordChars.push(newChar);
  }

  // Shuffle except first char
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return firstChar + passwordChars.join("");
};

export const generatePasswords = (quantity, length) => {
  const passwordList = [];
  for (let i = 0; i < quantity; i++) {
    passwordList.push(randomPassword(length));
  }
  return passwordList;
};
