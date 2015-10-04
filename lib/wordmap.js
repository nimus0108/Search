// takes in a bunch of images with their keywords and then returns an array of wordmaps
// basically, a wordmap says how often a word is together with another word
/* example:
'war': {
  'military': 12,
  'army': 10
}*/

export default (images) => {
  let wordmap = {};
  for (let image of images) {
    for (let keyword of image.keywords) {
      if (wordmap[keyword] === undefined) {
        wordmap[keyword] = {};
        image.keywords.forEach((relatedword) => wordmap[keyword][relatedword] = 1);
      } else {
        image.keywords.forEach((relatedword) => wordmap[keyword][relatedword]++);
      }
    }
  }
  return wordmap;
};
