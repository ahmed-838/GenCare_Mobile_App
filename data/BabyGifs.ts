// استبدال ملفات GIF بصور ثابتة (PNG/JPG) لتحسين الأداء
// preloaded letter images for better performance

// خريطة تخزين مسبق للصور لتحسين الأداء
const letterImages: Record<string, any> = {
  A: require('assets/images/letters/A.png'),
  B: require('assets/images/letters/B.png'),
  C: require('assets/images/letters/C.png'),
  D: require('assets/images/letters/D.png'),
  E: require('assets/images/letters/E.png'),
  F: require('assets/images/letters/F.png'),
  G: require('assets/images/letters/G.png'),
  H: require('assets/images/letters/H.png'),
  I: require('assets/images/letters/I.png'),
  J: require('assets/images/letters/J.png'),
  K: require('assets/images/letters/K.png'),
  L: require('assets/images/letters/L.png'),
  M: require('assets/images/letters/M.png'),
  N: require('assets/images/letters/N.png'),
  O: require('assets/images/letters/O.png'),
  P: require('assets/images/letters/P.png'),
  Q: require('assets/images/letters/Q.png'),
  R: require('assets/images/letters/R.png'),
  S: require('assets/images/letters/S.png'),
  T: require('assets/images/letters/T.png'),
  U: require('assets/images/letters/U.png'),
  V: require('assets/images/letters/V.png'),
  W: require('assets/images/letters/W.png'),
  X: require('assets/images/letters/X.png'),
  Y: require('assets/images/letters/Y.png'),
  Z: require('assets/images/letters/Z.png'),
};

// تحميل صور الحروف بطريقة أكثر كفاءة
export const getLetterGif = (letter: string) => {
  // الرجوع للصورة من الخريطة المخزنة مسبقاً
  if (letterImages[letter]) {
    return letterImages[letter];
  }
  
  // استخدام الملفات المخزنة مسبقاً كنسخة احتياطية (للتوافق الخلفي)
  switch (letter) {
    case 'A': return require('assets/gif/baby- (1).gif');
    case 'B': return require('assets/gif/baby- (2).gif');
    case 'C': return require('assets/gif/baby- (3).gif');
    case 'D': return require('assets/gif/baby- (4).gif');
    case 'E': return require('assets/gif/baby- (5).gif');
    case 'F': return require('assets/gif/baby- (6).gif');
    case 'G': return require('assets/gif/baby- (7).gif');
    case 'H': return require('assets/gif/baby- (8).gif');
    case 'I': return require('assets/gif/baby- (9).gif');
    case 'J': return require('assets/gif/baby- (10).gif');
    case 'K': return require('assets/gif/baby- (11).gif');
    case 'L': return require('assets/gif/baby- (12).gif');
    case 'M': return require('assets/gif/baby- (13).gif');
    case 'N': return require('assets/gif/baby- (14).gif');
    case 'O': return require('assets/gif/baby- (15).gif');
    case 'P': return require('assets/gif/baby- (16).gif');
    case 'Q': return require('assets/gif/baby- (17).gif');
    case 'R': return require('assets/gif/baby- (18).gif');
    case 'S': return require('assets/gif/baby- (19).gif');
    case 'T': return require('assets/gif/baby- (20).gif');
    case 'U': return require('assets/gif/baby- (21).gif');
    case 'V': return require('assets/gif/baby- (22).gif');
    case 'W': return require('assets/gif/baby- (23).gif');
    case 'X': return require('assets/gif/baby- (24).gif');
    case 'Y': return require('assets/gif/baby- (25).gif');
    case 'Z': return require('assets/gif/baby- (26).gif');
  }
};
  