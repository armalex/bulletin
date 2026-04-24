// @ts-nocheck
import { onMounted, ref } from "vue";

export interface BulletinParams {
  baseSalaireBrut: number;
  perco: number;
  tauxCadrehoDepart: number;
  modeApporteurParam: number;
  CAparam: number;
}

// import AmxListeCS from './AmxListeCS.vue'

const parametresCharges = ref(null);
const salaireBrutDebase = ref(0.0);
const notesDeFrais = ref(0.0);
const adhesionPerco = ref(0.0);
const modeApporteur = ref(0);
const fraisGestionCadreho = ref(0.0);

/* props du compoonsants */
const salaireBrut = ref(0.0);
const salaireNet = ref(0.0);
const estimationCA = ref(0);
const totalChargesPatronales = ref(0.0);
const totalChargesSalariales = ref(0.0);
const totalCharges = ref(0.0);
const totalSalaireCharge = ref(0.0);
const reserveFinanciere = ref(0.0);
const totalFrais = ref(0.0);
const fraisCadreho = ref(0.0);
const apporteurAffaire = ref(0.0);
const mutuelle = ref(37.1);
const bulletinPaie = ref({});
const calculCaSurChiffreAffaires = ref(1.7);

const bulletinSalaire = ref({
  BULLETIN: [Array],
  ENTETE: [Array],
  NOMBRE: [String, Number],
  SALAIREBRUT: [String, Number],
  SALAIRNET: [String, Number],
});
/* deux tableaux :
 */
const bulletinCalcule = ref([]);
const bulletinEntete = ref([]);
const bulletinFinal = ref([]);

/* tableau de traitement lus dans le JSON */
const chargesSociales = ref([]);
const chargesSocialesOriginal = ref([]);
const parametresChargesSociales = ref([]);

/* valeurs initialisées par le fichier JSON */
const PMSS = ref(0);
const PMSS400 = ref(0);
const SMIC = ref(0);
const SMIC330 = ref(0);
const SMIC225 = ref(0);
const SMIC400 = ref(0);
const SMIC350 = ref(0);
const BASECSG = ref(0);
const MUTUELLE = ref(37.1);
const FORFAITCONVENTION = ref(0);
const FORFAITHORAIRE = ref(0);
const TAUXAPPORTEUR = ref(0.0);

export function useBulletin(
  baseSalaireBrut: number = 0.0,
  ndf: number = 0.0,
  perco: number = 0.0,
  tauxCadrehoDepart: number = 0.09,
  modeApporteurParam: number = 0,
  CAparam: number = 0.0
) {
  // const parametresCharges = ref(null);
  salaireBrutDebase.value = baseSalaireBrut;
  notesDeFrais.value = ndf;
  adhesionPerco.value = perco;
  modeApporteur.value = modeApporteurParam;
  fraisGestionCadreho.value = tauxCadrehoDepart;
  console.log("CAparam", CAparam);
  // var salaireBrutDebaseJS = 0.0;

  // var fraisCadrehoJS = 0.0;
  // var chargepatronaleJS = 0.0;

  // const BASEFS8 =ref(0)

  onMounted(() => {
    console.log(
      "Composant AmxMoteurBulletin.js monté ...salairebrut, fraisgestion, mode",
      salaireBrutDebase.value,
      fraisGestionCadreho.value,
      modeApporteur.value
    );

    console.log("CAparam", CAparam);
    getParametresJson(
      salaireBrutDebase.value,
      fraisGestionCadreho.value,
      modeApporteur.value,
      CAparam
    );
  });

  /* */
  function getParametresJson(
    salaireBrutParam: number,
    tauxCadrehParam: number,
    modeApporteurParam: number,
    CAparam: number = 0 // Valeur par défaut pour éviter les erreurs TS
  ) {
    fetch("chargeSalariale.json")
      .then((res) => res.json())
      .then((data) => {
        modeApporteur.value = modeApporteurParam;
        console.log("modeApporteur.value", modeApporteur.value);
        fraisGestionCadreho.value = tauxCadrehParam;
        parametresCharges.value = data;
        parametresChargesSociales.value =
          parametresCharges.value.ParametresChargesSociales;
        chargesSocialesOriginal.value = parametresCharges.value.ChargesSociales;
        chargesSociales.value = chargesSocialesOriginal.value.slice();
        salaireBrutDebase.value = salaireBrut;
        var salaireBrutDebaseJS = salaireBrutParam;
        console.log(
          "salaireBrutDebaseJS",
          salaireBrutDebaseJS,
          salaireBrutDebase.value
        );
        initialise(salaireBrutDebaseJS, CAparam);

        // console.log("parametresCharges ",parametresCharges.value)
      })
      .catch((err) => {
        console.log("Fichier introuvabele", err);
        alert("Fichier JSON  introuvable");
      });
  }

  function initialise(salaireBrutDebaseJS, CAparam) {
    salaireBrutDebase.value = salaireBrutDebaseJS;
    // console.log("Initialise salaireBrutDebase", salaireBrutDebase.value);
    // console.log("Initialise salaireParametre", salaireParametre);

    bulletinFinal.value.splice(0, bulletinFinal.value.length);
    bulletinEntete.value.splice(0, bulletinEntete.value.length);
    bulletinCalcule.value.splice(0, bulletinCalcule.value.length);
    chargesSociales.value.splice(0, chargesSociales.value.length);

    // initialisation des deux tableaux parametresChargeSociales et chargesSociale */
    parametresChargesSociales.value =
      parametresCharges.value.ParametresChargesSociales;
    // console.log(" initialise parametresCharges.value", parametresCharges.value);
    chargesSocialesOriginal.value = parametresCharges.value.ChargesSociales;
    chargesSociales.value = chargesSocialesOriginal.value.slice();

    /* calcul sur les deux tableaux */
    parametresChargesSociales.value.forEach(getParametres);

    /* filtre les éléments du  bulletin en fonction des valeurs de brut  définies */
    // console.log("modeApporteur.value", modeApporteur.value);
    if (modeApporteur.value == 1) {
      apporteurAffaire.value = parseFloat(
        salaireBrutDebase.value * TAUXAPPORTEUR.value
      ).toFixed(2);
    } else apporteurAffaire.value = 0.0;
    // console.log("apporteurAffaire.value", apporteurAffaire.value);
    // apporteurAffaire.value = parseFloat(
    //   salaireBrutDebase.value * TAUXAPPORTEUR.value
    // ).toFixed(2);
    salaireBrut.value = parseFloat(
      (
        parseFloat(salaireBrutDebase.value) + parseFloat(apporteurAffaire.value)
      ).toFixed(2)
    );
    /* filtre ds valeurs consevées en fonction du CA */
    filtreBulletin();

    /* calcul le bulletin final */
    // console.log("--------------------------------------------");
    chargesSociales.value.forEach(calculeBulletin);
    // console.log("--------------------------------------------");

    getEnteteBulletin();

    getMontantTotalChargesSalariales();
    getMontantTotalChargesPatronales();
    var chargepatronaleJS = totalChargesPatronales.value;
    getTotalSalaireCharge();
    console.log("CAparam", CAparam);
    if (CAparam == 0) {
      estimationCA.value = getChiffreAffaire();
    } else estimationCA.value = CAparam;
    console.log("estimationCA.value", estimationCA.value);
    getfraiscadeho(estimationCA.value);
    getReserveFinanciere();
    getSalaireNet();

    bulletinFinal.value.push(bulletinEntete);
    bulletinFinal.value.push(bulletinCalcule);
    bulletinFinal.value.push(salaireNet);
    bulletinFinal.value.push(salaireBrut);
    bulletinFinal.value.push(totalChargesPatronales);
    bulletinFinal.value.push(totalChargesSalariales);
    bulletinFinal.value.push(totalSalaireCharge);
    bulletinFinal.value.push(fraisCadreho);
    bulletinFinal.value.push(estimationCA);
    console.log("--------------------------------------------");
    console.log("estimationCA", estimationCA.value);
    console.log("salaireBrutDebase", salaireBrutDebase.value);
    console.log("apporteurAffaire", apporteurAffaire.value);
    console.log("salaireBrut", salaireBrut.value);
    console.log("totalChargesPatronales", totalChargesPatronales.value);
    console.log("totalChargesSalariales", totalChargesSalariales.value);
    console.log("totalSalaireCharge", totalSalaireCharge.value);
    console.log("reserveFinanciere", reserveFinanciere.value);
    console.log("fraisCadreho", fraisCadreho.value);
    console.log("salairenet", salaireNet.value);

    totalCharges.value = parseFloat(
      totalChargesPatronales.value + totalChargesSalariales.value
    ).toFixed(2);
  }

  function getEnteteBulletin() {
    const bulletinEntete = bulletinFinal.value.filter(
      (item) => item.CATEGORIE == "4"
    );
  }

  function getMontantTotalChargesSalariales() {
    totalChargesSalariales.value = 0.0;
    totalChargesSalariales.value = bulletinCalcule.value.reduce(
      (acc, current) => {
        // console.log("acc", acc, current.MONTANTPATRONAL, current.CATEGORIE);
        if (current.CATEGORIE != 4)
          return (acc += parseFloat(current.MONTANTSALARIAL));
        else return acc;
      },
      0
    );
    // console.log("totalChargesSalariales.value", totalChargesSalariales.value);
  }

  function getMontantTotalChargesPatronales() {
    totalChargesPatronales.value = 0.0;
    totalChargesPatronales.value = bulletinCalcule.value.reduce(
      (acc, current) => {
        // console.log("acc", acc, current.MONTANTPATRONAL, current.CATEGORIE);
        if (current.CATEGORIE != 4)
          return (acc += parseFloat(current.MONTANTPATRONAL));
        else return acc;
      },
      0
    );
    // console.log("totalChargesPatronales.value", totalChargesPatronales.value);
    // bulletinFinal.value.push(totalChargesPatronales.value);
  }

  function getSalaireNet() {
    salaireNet.value = salaireBrut.value - totalChargesSalariales.value;
    console.log("salaireNet.value", salaireNet.value);
    // bulletinFinal.value.push(salaireNet.value);
  }

  function getTotalSalaireCharge() {
    totalSalaireCharge.value =
      parseFloat(salaireBrutDebase.value) +
      parseFloat(apporteurAffaire.value) +
      parseFloat(notesDeFrais.value) +
      parseFloat(totalChargesPatronales.value);
    // console.log("totalSalaireCharge.value ", totalSalaireCharge.value);
  }

  function getChiffreAffaire() {
    var CA = salaireBrutDebase.value * calculCaSurChiffreAffaires.value;
    return Math.round(CA);
  }

  function getReserveFinanciere() {
    // console.log("--------------------------------------getReserveFinanciere ");
    var provision = salaireBrut.value / 10;
    var chargesPatronales = provision * 0.47;
    var rupture = salaireBrut.value * (0.33 / 12);
    var ruptureCharge = rupture * 0.3;
    reserveFinanciere.value =
      provision + rupture + ruptureCharge + chargesPatronales;
    // console.log("reserveFinanciere.value", reserveFinanciere.value);
    // var total = totalSalaireCharge.value + reserveFinanciere.value;
  }

  function getfraiscadeho(CA) {
    fraisCadreho.value = CA * fraisGestionCadreho.value;
    console.log(
      "fraisGestionCadreho.value : CA ",
      fraisGestionCadreho.value,
      CA
    );
    console.log("fraisCadreho.value ", fraisCadreho);
  }

  function getParametres(item, index) {
    // console.log("item ", item.LIBELLE);
    if (item.LIBELLE == "SMIC") SMIC.value = item.VALEUR;
    else if (item.LIBELLE == "PMSS") PMSS.value = item.VALEUR;
    else if (item.LIBELLE == "BASECSG") BASECSG.value = item.VALEUR;
    else if (item.LIBELLE == "MUTUELLE") MUTUELLE.value = item.VALEUR;
    else if (item.LIBELLE == "FORFAITCONVENTION")
      FORFAITCONVENTION.value = item.VALEUR;
    else if (item.LIBELLE == "FORFAITHORAIRE")
      FORFAITHORAIRE.value = item.VALEUR;
    else if (item.LIBELLE == "TAUXAPPORTEUR") TAUXAPPORTEUR.value = item.VALEUR;
    // else
    // console.log("calcul sur les autres parametres");
    // return;

    // TAUXAPPORTEUR
    SMIC350.value = SMIC.value * 3.5;
    SMIC330.value = SMIC.value * 3.3;
    SMIC225.value = SMIC.value * 2.5;
    SMIC400.value = SMIC.value * 4;
    PMSS400.value = PMSS.value * 4;

    // console.log(
    //   "SMIC, SMIC225, SMIC330, SMIC400, PMSS, PMSS400  ",
    //   SMIC.value,
    //   SMIC225.value,
    //   SMIC330.value,
    //   SMIC400.value,
    //   PMSS.value,
    //   PMSS400.value
    // );
  }

  function filtreBulletin() {
    // console.log(
    //   "filtre du buletin ",
    //   salaireBrut.value,
    //   SMIC330.value,
    //   PMSS400.value
    // );

    /* supprimer les lignes 
    4810 6016 6020 6028 si SB-PMSS < 0 
    */
    let indiceSalairebas = ["4810", "6016", "6020", "6028", "7131"];
    if (salaireBrut.value - PMSS.value < 0.0) {
      indiceSalairebas.forEach((element) => {
        // console.log("rubrique supprimée", element);
        var removeIndex = chargesSociales.value
          .map((item) => item.RUBRIQUE)
          .indexOf(element);
        if (removeIndex != -1)
          // console.log("suppresion Allocation familiale majorée", removeIndex);
          chargesSociales.value.splice(removeIndex, 1);
      });
    }

    if (salaireBrut.value < SMIC330.value) {
      var removeIndex = chargesSociales.value
        .map((item) => item.RUBRIQUE)
        .indexOf("4070");
      if (removeIndex != -1)
        // console.log("suppresion Allocation familiale majorée", removeIndex);
        chargesSociales.value.splice(removeIndex, 1);
    }

    if (salaireBrut.value < SMIC225.value) {
      // console.log("superieur 4085", removeIndex);
      var removeIndex = chargesSociales.value
        .map((item) => item.RUBRIQUE)
        .indexOf("4085");
      if (removeIndex != -1)
        // console.log("suppresion Maladie majoration  ", removeIndex);
        chargesSociales.value.splice(removeIndex, 1);
    }

    if (salaireBrut.value < PMSS400.value) {
      // console.log("superieur", removeIndex);
      var removeIndex = chargesSociales.value
        .map((item) => item.RUBRIQUE)
        .indexOf("7132");
      if (removeIndex != -1) chargesSociales.value.splice(removeIndex, 1);
    }

    var removeIndex = chargesSociales.value
      .map((item) => item.RUBRIQUE)
      .indexOf("4600");
    if (removeIndex != -1)
      // console.log("suppresion 4600", removeIndex);
      chargesSociales.value.splice(removeIndex, 1);
  }

  function getForfaitSocialBase() {
    var valeur = chargesSociales.value.reduce((accu, currentValue) => {
      if (currentValue.RUBRIQUE == "7130")
        accu = accu + (PMSS.value * currentValue.PATRONALE) / 100;
      else if (currentValue.RUBRIQUE == "7131")
        accu =
          accu +
          ((salaireBrut.value - PMSS.value) * currentValue.PATRONALE) / 100 +
          ((salaireBrut.value - PMSS.value) * currentValue.SALARIALE) / 100;
      else if (currentValue.RUBRIQUE == "7623")
        accu = accu + currentValue.PATRONALE;
      return accu;
    }, 0);
    var base = parseFloat(valeur) + parseFloat(mutuelle.value * 2);
    // console.log("valeur", valeur);
    valeur = valeur + MUTUELLE.value;
    // console.log("base", base);
    return parseFloat(base).toFixed(2);
  }

  function getCsgBase() {
    var base = parseFloat(salaireBrut.value * BASECSG.value).toFixed(2);

    // console.log("base", base);
    // calcul complément pour 7130 et 7131
    var valeur = chargesSociales.value.reduce((accu, currentValue) => {
      if (currentValue.RUBRIQUE == "7130")
        accu = accu + (PMSS.value * currentValue.PATRONALE) / 100;
      else if (currentValue.RUBRIQUE == "7131")
        accu =
          accu +
          ((salaireBrut.value - PMSS.value) * currentValue.PATRONALE) / 100;
      return accu;
    }, 0);
    // console.log("valeur", valeur)
    base = parseFloat(base) + parseFloat(valeur);
    // console.log ("base CSG",base)
    return parseFloat(base).toFixed(2);
  }

  /*
Calcuule l'intégralité du bulletin pour chaque ligne du fichierconsevée
*/

  function calculeBulletin(item, index) {
    let valeurSalariale = 0;
    let valeurPatronale = 0;
    const newValeur = Object.create(bulletinSalaire);

    if (item.TYPE == "SB")
      newValeur.BASE = parseFloat(salaireBrut.value).toFixed(2);
    else if (item.TYPE == "PMSS") {
      if (
        item.RUBRIQUE == "4010" ||
        item.RUBRIQUE == "6000" ||
        item.RUBRIQUE == "6008" ||
        item.RUBRIQUE == "7130"
      ) {
        salaireBrut.value < PMSS.value
          ? (newValeur.BASE = salaireBrut.value)
          : (newValeur.BASE = parseFloat(PMSS.value).toFixed(2));
      } else {
        newValeur.BASE = parseFloat(PMSS.value).toFixed(2);
      }
    } else if (item.TYPE == "SB-PMSS")
      newValeur.BASE = Math.round(
        parseFloat(salaireBrut.value) - parseFloat(PMSS.value)
      ).toFixed(2);
    else if (item.TYPE == "CSG") newValeur.BASE = getCsgBase();
    else if (item.TYPE == "FS8PRE") newValeur.BASE = getForfaitSocialBase();
    else newValeur.BASE = 0.0;

    //  console.log ("BASE  ",item.TYPE,newValeur.BASE);
    if (item.APPLICATION != 4) {
      /* cas particuliers */
      if (item.RUBRIQUE == "7623") {
        valeurSalariale = 37.1;
        valeurPatronale = 37.1;
      } else {
        valeurSalariale = ((newValeur.BASE * item.SALARIALE) / 100).toFixed(2);
        valeurPatronale = ((newValeur.BASE * item.PATRONALE) / 100).toFixed(2);
      }

      newValeur.REFERENCE = item.RUBRIQUE;
      newValeur.LIBELLE =
        item.APPLICATION == 6 ? item.INTITULE + "💐" : item.INTITULE;
      newValeur.TAUXSALARIAL = item.SALARIALE;
      newValeur.MONTANTSALARIAL = valeurSalariale;
      newValeur.TAUXPATRONAL = item.PATRONALE;
      newValeur.MONTANTPATRONAL = valeurPatronale;
      newValeur.NOMBRE = "";
      newValeur.CATEGORIE = item.APPLICATION;
      newValeur.TOTALLIGNE = (
        parseFloat(valeurPatronale) + parseFloat(valeurSalariale)
      ).toFixed(2);
      bulletinCalcule.value.push(newValeur);
      // console.log("total", newValeur.TOTALLIGNE);
    } else {
      var nombre = "";
      var montantSalarial = 0.0;
      var base = 0.0;
      if (item.RUBRIQUE == "53") {
        nombre = parseFloat(FORFAITCONVENTION.value).toFixed(2);
      } else if (item.RUBRIQUE == "0101") {
        nombre = parseFloat(FORFAITHORAIRE.value).toFixed(2);
        montantSalarial = salaireBrutDebase.value;
      } else if (item.RUBRIQUE == "1100") {
        newValeur.BASE = parseFloat(salaireBrutDebase.value).toFixed(2);
        montantSalarial = apporteurAffaire.value;
        console.log("apporteurAffaire", apporteurAffaire.value);
      } else if (item.RUBRIQUE == "3999") {
        montantSalarial = salaireBrut.value;
      } else nombre = "";
      // newValeur.BASE = base;
      newValeur.REFERENCE = item.RUBRIQUE;
      newValeur.LIBELLE = item.INTITULE;
      newValeur.TAUXSALARIAL = parseFloat(montantSalarial).toFixed(2);
      newValeur.MONTANTSALARIAL =
        montantSalarial == 0.0 ? parseFloat(montantSalarial).toFixed(2) : "-";
      newValeur.TAUXPATRONAL = item.PATRONALE;
      newValeur.MONTANTPATRONAL = 0.0;
      newValeur.NOMBRE = nombre;
      newValeur.CATEGORIE = item.APPLICATION;
      newValeur.TOTALLIGNE = 0.0;
      bulletinEntete.value.push(newValeur);
    }
  }
  // return bulletinFinal;

  return {
    bulletinFinal,
    bulletinEntete,
    bulletinCalcule,
    salaireNet,
    salaireBrut,
    totalChargesPatronales,
    totalChargesSalariales,
    totalSalaireCharge,
    reserveFinanciere,
    fraisCadreho,
    estimationCA,
    notesDeFrais,
    primeApporteur: apporteurAffaire,
    getParametresJson,
  };
}
