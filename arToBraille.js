

let arab;
let temp = new Set()	// menyimpan karakter-karakter yang belum terproses.
const arToBraille = {
	'\u0627' : '\u2801', /*alif*/ '\u0628' : '\u2803', /*b*/ '\u062a' : '\u281e', /*t*/ '\u062b' : '\u2839', /*ts rhingan*/ '\u062c' : '\u281a', /*j*/ '\u062d' : '\u2831', /*kh ringan*/ '\u062e' : '\u282d', /*kho*/ '\u062f' : '\u2819', '\u0630' : '\u2836', /*ż*/ '\u0631' : '\u2817', /*r*/ '\u0632' : '\u2835', /*z*/ '\u0633' : '\u280e', /*s*/
	'\u0634' : '\u2829', /*sy*/ '\u0635' : '\u282F', /*shod*/ '\u0636' : '\u282B', /*dhod*/ '\u0637' : '\u283E', /*thot*/ '\u0638' : '\u283F', /*dhod*/ '\u0639' : "\u2837", /*‘ain*/ '\u063a' : '\u2823', /*gh*/
	'\u0641' : '\u280b', '\u0642' : '\u281f', /*q*/ '\u0643' : '\u2805', /*k*/ '\u0644' : '\u2807', /*l*/ '\u0645' : '\u280d', /*m*/ '\u0646' : '\u281d', /*n*/ '\u0647' : '\u2813', /*h*/ '\u0648' : '\u283a', /*w*/ '\u064a' : '\u280a', /*y*/
	'\u0623' : '', /*أ*/ '\u0626' : '\u283D', /*ئ*/ '\u0624' : '\u2833', /*ؤ*/ 
	// '\u0625' : '\u2804\u2811', /*إ, jadi hamzah ketemu kasrah (harus di tes: kata 'islam)*/ 
	'\u0621' : '\u2804', /*hamzah berdiri sendiri ء*/
	'\u0629' : '\u2821',	// ta marbuttah
	'\u0649' : '\u2815', // alif maksura, baca panjang
	'\u0670' : '\u2808',	// tanda alif kecil di atas.

	'\u064E' : '\u2802', //fathah
	'\u064F' : '\u2825',	//dhommah
	'\u0650' : '\u2811', // kasrah
	'\u0657' : '\u282C', // dhommah terbalik ٗ
	// '\u0656' : '', // kasrah tegak
	'\u064b' : '\u2806', // fathatain
	'\u064d' : '\u2814', // kasratain
	'\u064c' : '\u2822', // dhommatain
	'\u0653' : '\u282a', // ٓ, bendera tanda harakat panjang.
	'\u0652' : '\u2812',	// sukun 
}

const specialChars = {	// karakter-karakter yag perlu perlakuan khusus.
	'\u2827' : '', // lamAlif
	
	

	'\u0651' : '\u2820',	// tasydid  
	
	
}



function arToB() {
	for (let ch of arab) {
		arab = arab.replace(new RegExp(ch), function () {
			if (typeof(arToBraille[ch]) === 'undefined') {
				temp = temp.add(ch)
				return ch
			} else {
				return arToBraille[ch]
			}
		})
	}
}

function tasydid() {
	
	let regExpCombination = {
		'([^\u2811])\u0651([^ ])' : '\u2820$1$2',	// bukanKasrah + tasydid + hurufApapun
		'([^ ])\u2811\u0651' : '\u2820$1\u2811',	// hurufApapun + kasrah + tasydid
	}
	for (let key in regExpCombination) {
		arab = arab.replace(new RegExp(key, 'g'), regExpCombination[key])
	}
	temp.delete('\u0651')
	return arab
}

function mad() {
	let regExpCombination = {
		'\u2802\u2801' : '\u2801', // fatha ketemu alif
		'\u2802\u2815' : '\u2815', // fathah ketemu alif matsuro
		'\u2811\u280a\u2812?' : '\u280a',	// kasrah ketemu ya ketemu sukun (sukun nyatidak wajib)
		'\u2825\u283a\u2812?' : '\u283a',	// dommah ketemu waw ketemu sukun (sukun nya tidak wajib)
	}
	for (let key in regExpCombination) {
		arab = arab.replace(new RegExp(key, 'g'), regExpCombination[key])
	}
	return arab;
}

function lamAlif() {
	arab = arab.replace(/\u2807\u2820?\u2802?\u2801([^ ])? /g, '\u2827$1')
	return arab;
}
function newLineToBreak() {	// biar line space di inputan textarea ngikut
	arab = arab.replace(/ ?[\n] ?/g, '<br />')
}

function runIt() {
	arab = $('#arab').val()
	newLineToBreak()
	arToB()
	tasydid()
	mad()
	lamAlif()
	$('#braille').html(arab)
}


