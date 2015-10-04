// determines if a keyword describes an image already parsed by Clarifai

const areSimilar = (keyword, image, wordmap) => {
  let wordsUsedInConjunction = [];

  for (let word in wordmap[keyword]) {
    console.log(word, ":", wordmap[keyword]);
    wordsUsedInConjunction.push({word: word, frequency: wordmap[keyword]});
  }
};

export default areSimilar;
