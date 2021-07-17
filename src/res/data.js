import { useRef, createRef } from 'react'
export const PRODUCT_LIST = [
  {
    title: 'MDR-XB550AP',
    description:
      'هدفون سیمی MDR-XB550AP محصولی از کمپانی محبوب سونی است و دارای کاپ‌های نرم و سری قابل تنظیم است که می‌توانید ساعت‌های زیادی از آن بدون ایجاد خستگی و یا سنگینی استفاده کنید',
    price: '$20',
    bg: '#9dcdfa',
    id: '1',
    url: require('../images/Headphones/1.png'),
    brand: 'Sony',
    ref: createRef(),
  },
  {
    title: 'WH-CH710N',
    description:
      'این مدل برای شنیدن موسیقی مناسب است و ویژگی‌هایی ارائه می‌دهد که از این بین می‌توان به بهره‌مندی از میکروفون و داشتن دستیار صوتی هوشمند اشاره کرد. همچنین این هدفون می‌تواند جلوی شنیده شدن صداهای محیطی ناخواسته را بگیرد.',
    price: '$20',
    bg: '#db9efa',
    id: '2',
    url: require('../images/Headphones/2.png'),
    brand: 'Razer',
    ref: createRef(),
  },
  {
    title: 'WH-1000XM3',
    description:
      '.این مدل هدفون دارای کنترل هوشمند صدا Adaptive Sound Control میباشد که با توجه به صدای محیط میزان صدای هدفون را تنظیم میکند.گوش دادن هوشمند توسط Adaptive Sound Control همه رفتار شما را شناسایی می کند',
    price: '$20',
    bg: '#999',
    id: '3',
    url: require('../images/Headphones/3.png'),
    brand: 'Panasonic',
    ref: createRef(),
  },
  {
    title: 'WH-XB900N',
    description:
      'این هدفون از درایورهای ۴۰ میلی‌متری داینامیک بهره‌مند است. این درایورها، به‌کمک موارد دیگری نظیر پورت بیس و طراحی حساب‌شده‌ی ایرکاپ‌ها و ایرپدها، بیسی بسیار قدرتمند و کوبنده تولید می‌کنند که بدون شک به مذاق بیس‌دوست‌ها و طرفداران سبک‌هایی چون الکترونیک و هیپ‌هاپ خوش خواهد آمد.',
    price: '$20',
    bg: '#a1e3a1',
    id: '4',
    url: require('../images/Headphones/4.png'),
    brand: 'Beats',
    ref: createRef(),
  },
]
