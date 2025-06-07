import axios from 'axios';

const LIBRE_TRANSLATE_API = 'https://libretranslate.de/translate';

export async function translateText(text: string, targetLang: string = 'ar') {
  try {
    // إضافة معالجة محلية مؤقتة في حالة فشل الاتصال
    if (!navigator.onLine) {
      return text; // إرجاع النص الأصلي إذا لم يكن هناك اتصال
    }

    const response = await axios.post(LIBRE_TRANSLATE_API, {
      q: text,
      source: 'en',
      target: targetLang
    }, {
      timeout: 5000 // تحديد مهلة زمنية للطلب
    });
    return response.data.translatedText;
  } catch (error) {
    console.warn('Translation failed:', error);
    return text; // إرجاع النص الأصلي في حالة حدوث خطأ
  }
}

// Hook للترجمة
export function useTranslation() {
  const translate = async (text: string) => {
    return await translateText(text);
  };

  return { translate };
}
