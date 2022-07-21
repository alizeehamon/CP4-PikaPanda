/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
function calculateMatch(pandas, idPanda) {
  const myPanda = pandas.find((panda) => {
    return panda.id == idPanda;
  });
  pandas = pandas.filter((panda) => panda.id != idPanda);
  pandas.forEach((panda) => {
    panda.score = 100;
    if (panda.available === 0) {
      panda.score -= 50;
    }
    // Cas du demi frère ou soeur
    if (
      panda.id_mother === myPanda.id_mother &&
      panda.id_mother !== null &&
      myPanda.id_mother !== null
    ) {
      panda.score -= 50;
    }
    if (
      panda.id_father === myPanda.id_father &&
      panda.id_father !== null &&
      myPanda.id_father !== null
    ) {
      panda.score -= 50;
    }
    // Cas du père ou mère de myPanda
    if (myPanda.id_mother === panda.id) {
      panda.score -= 50;
    }
    if (myPanda.id_father === panda.id) {
      panda.score -= 50;
    }
    // Cas de l'enfant de myPanda
    if (panda.id_mother === myPanda.id) {
      panda.score -= 50;
    }
    if (panda.id_father === myPanda.id) {
      panda.score -= 50;
    }
    const difference =
      myPanda.birth_date.getTime() - panda.birth_date.getTime();
    const totalDays = Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
    panda.score -= totalDays / 100;
  });
  pandas = pandas.sort((a, b) => (a.score > b.score ? -1 : 1));
  pandas = pandas.slice(0, 6);
  return pandas;
}
module.exports = calculateMatch;
