export function singularize(word: string) {
  const endings: {
    [key: string]: string;
  } = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: '',
    ses: '',
    es: '',
    s: '',
  };
  return word.replace(
    new RegExp(`(${Object.keys(endings).join('|')})$`),
    (r) => endings[r]
  );
}
