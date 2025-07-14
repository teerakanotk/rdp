export const pwdgen = (length) => {
  const upper = "ABCDEFGHJKLMNPQRTUVWXYZ"; // no O, I, S
  const lower = "abcdefghijkmnopqrstuvwxyz"; // no l
  const digits = "2346789"; // no 0, 1, 5
  const specials = "@#";

  // Combine all allowed characters into one array (excluding special chars for now)
  const pool = [...upper, ...lower, ...digits];
  const used = new Set();

  // 1. Ensure at least one of each required type
  const getUniqueChar = (chars) => {
    let char;
    do {
      char = chars[Math.floor(Math.random() * chars.length)];
    } while (used.has(char));
    used.add(char);
    return char;
  };

  const firstChar = getUniqueChar([...upper, ...lower]); // must be a letter
  const oneUpper = getUniqueChar(upper);
  const oneLower = getUniqueChar(lower);
  const oneDigit = getUniqueChar(digits);
  const oneSpecial = getUniqueChar(specials);

  // Start building password
  let passwordChars = [oneUpper, oneLower, oneDigit, oneSpecial];

  // Fill remaining characters from pool (excluding already used ones)
  while (passwordChars.length < length - 1) {
    // -1 because firstChar is reserved
    const available = pool.filter((c) => !used.has(c));
    if (available.length === 0) break;
    passwordChars.push(getUniqueChar(available));
  }

  // Shuffle remaining characters (not including the first character)
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return firstChar + passwordChars.join("");
};
