module.exports.sum = (a, b) => Number(a) + Number(b);

module.exports.getSurnameWithInitials = fullName => {
  if (typeof fullName !== 'string') {
    throw new Error('Input must be a string');
  }

  const parts = fullName.trim().split(/\s+/);

  if (parts.length < 2) {
    throw new Error(
      'Full name must include at least a surname and a first name'
    );
  }

  if (parts.length > 3) {
    throw new Error('Full name must include a maximum of 3 words');
  }

  const surname = parts[0];
  const initials = parts
    .slice(1)
    .map(name => name[0]?.toUpperCase() + '.')
    .join('');

  return `${surname} ${initials}`;
};
