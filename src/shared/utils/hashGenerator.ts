function hashGenerator(length = 10): string {
  let hash = '';

  for (let i = 0; i <= length; i += 1) {
    hash += Math.random().toString(36).substr(2);
  }

  hash = hash.substr(0, length);

  return hash;
}

export default hashGenerator;
