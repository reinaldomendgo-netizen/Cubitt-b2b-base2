
import { Product } from './types';

export const COLOR_MAP: Record<string, string> = {
  'Black': '#1D1D1F',
  'Obsidian Black': '#1D1D1F',
  'Onyx Black': '#000000',
  'White': '#FFFFFF',
  'Snow White': '#F5F5F7',
  'Off White': '#FAF9F6',
  'Rose Gold': '#B76E79',
  'Dusty Rose': '#DCAE96',
  'Dreamy Pink': '#F2D2D6',
  'Light Pink': '#FFB6C1',
  'Hot Pink': '#FF69B4',
  'Pink': '#FFC0CB',
  'Blue': '#003366',
  'Deepest Blue': '#001f3f',
  'Navy Blue': '#000080',
  'Navy': '#000080',
  'Sky Blue': '#87CEEB',
  'Light Blue': '#ADD8E6',
  'Frozen Blue': '#A5F2F3',
  'Cinderella Blue': '#A0D6E8',
  'Silver': '#C0C0C0',
  'Light Silver': '#D3D3D3',
  'Grey': '#808080',
  'Gray': '#808080',
  'Wolf Gray': '#7D7F7D',
  'Gun Metal': '#2a2a2a',
  'Teal': '#008080',
  'Smoke Teal': '#5F9EA0',
  'Mint': '#98FF98',
  'Mint Green': '#98FF98',
  'Forest Green': '#228B22',
  'Military Green': '#4B5320',
  'Olive Green': '#808000',
  'Khaki Green': '#8FBC8F',
  'Moana Green': '#2E8B57',
  'Sand': '#C2B280',
  'Light Sand': '#EADDcf',
  'Desert Sand': '#EDC9AF',
  'Warm Beige': '#D2B48C',
  'Toasted Almond': '#D2B48C',
  'Brown': '#A52A2A',
  'Mocha Brown': '#6F4E37',
  'Lilac': '#C8A2C8',
  'Dusty Lilac': '#B69FB8',
  'Lavender Mist': '#E6E6FA',
  'Purple': '#800080',
  'Rapunzel Purple': '#9370DB',
  'Red': '#FF0000',
  'Cars Red': '#DC143C',
  'Deep Burgundy': '#800020',
  'Terracotta': '#E2725B',
  'Orange': '#FFA500',
  'Yellow': '#FFFF00',
  'Butter Yellow': '#F0E68C',
  'Rapunzel Yellow': '#F0E68C',
  'Cotton Candy': '#FFBCD9',
  'Smoke Blue': '#5F9EA0',
  'Black Camo': '#333333',
  'Gray Camo': '#888888',
  'Black Cheetah': '#1A1A1A',
  'White Cheetah': '#EEEEEE',
  'Cosmic': '#4B0082',
  'Mickey Blue': '#0066CC',
  'Minnie Pink': '#FF69B4',
  'Chase Blue': '#0000CC',
  'Marshall Red': '#CC0000',
  'Skye Pink': '#FFB6C1',
  'Rubble Yellow': '#FFD700',
  'Arctic Blue': '#82CFFD',
  'Dusty Mauve': '#BCA3AC',
};

export const PRODUCTS: Product[] = [
  // --- SMARTWATCHES ---
  {
    id: 'terra', handle: 'terra', title: 'TERRA',
    description: 'Smartwatch resistente con certificación de grado militar, GPS de doble banda y VITA AI.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Smartwatches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA1.webp?v=1758815026',
    tags: ['New', 'GPS'],
    isBestSeller: true,
    variants: [
      { sku: 'CT-TERRA1', option1: 'Obsidian Black', price: 139.99, inventory: 81, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA1.webp?v=1758815026' },
      { sku: 'CT-TERRA3', option1: 'Military Green', price: 139.99, inventory: 469, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA3.webp?v=1763500926' },
      { sku: 'CT-TERRA7', option1: 'Off White', price: 139.99, inventory: 472, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA7.webp?v=1763500926' },
      { sku: 'CT-TERRA9', option1: 'Desert Sand', price: 139.99, inventory: 583, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA9.webp?v=1763500926' }
    ]
  },
  {
    id: 'terra-special-edition', handle: 'terra-special-edition', title: 'TERRA Special Edition',
    description: 'Edición especial del smartwatch Terra con correas adicionales y acabados premium.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Smartwatches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA58.webp?v=1764691907',
    tags: ['New', 'GPS', 'Special Edition'],
    variants: [
      { sku: 'CT-TERRA58', option1: 'Obsidian Black', price: 154.99, inventory: 559, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TERRA58.webp?v=1764691907' }
    ]
  },
  {
    id: 'viva-pro-2', handle: 'viva-pro-2', title: 'VIVA Pro 2',
    description: 'Pantalla AMOLED HD 1.85", GPS integrado y monitoreo avanzado de salud.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Smartwatches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVAP2-1.webp?v=1758822391',
    tags: ['New', 'GPS'],
    isBestSeller: true,
    variants: [
      { sku: 'CT-VIVAP2-1', option1: 'Obsidian Black', price: 99.99, inventory: 869, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVAP2-1.webp?v=1758822391' },
      { sku: 'CT-VIVAP2-2', option1: 'Deepest Blue', price: 99.99, inventory: 562, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVAP2-2.webp?v=1763501038' },
      { sku: 'CT-VIVAP2-5', option1: 'Rose Gold', price: 99.99, inventory: 779, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVAP2-5.webp?v=1763501038' },
      { sku: 'CT-VIVAP2-8', option1: 'Wolf Gray', price: 99.99, inventory: 807, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVAP2-8.webp?v=1763501038' },
      { sku: 'CT-VIVAP2-9', option1: 'Mocha Brown', price: 99.99, inventory: 518, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVAP2-9.webp?v=1763501038' }
    ]
  },
  {
    id: 'aura-pro-2', handle: 'aura-pro-2', title: 'AURA Pro 2',
    description: 'Smartwatch circular con GPS, pantalla AMOLED 1.48" y llamadas Bluetooth.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Smartwatches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-1_Black.webp?v=1758813592',
    tags: ['New', 'GPS'],
    variants: [
      { sku: 'CT-AURAP2-1', option1: 'Obsidian Black', price: 119.99, inventory: 831, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-1_Black.webp?v=1758813592' },
      { sku: 'CT-AURAP2-2', option1: 'Deepest Blue', price: 119.99, inventory: 665, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-2.webp?v=1763501131' },
      { sku: 'CT-AURAP2-5', option1: 'Rose Gold', price: 119.99, inventory: 570, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-5.webp?v=1763501131' },
      { sku: 'CT-AURAP2-8', option1: 'Wolf Gray', price: 119.99, inventory: 642, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-8.webp?v=1763501131' },
      { sku: 'CT-AURAP2-9', option1: 'Mocha Brown', price: 119.99, inventory: 667, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-9.webp?v=1763501131' }
    ]
  },
  {
    id: 'aura-2', handle: 'aura-2', title: 'AURA 2',
    description: 'Smartwatch ligero con pantalla AMOLED de 1.43", VITA AI y salud 24/7.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Smartwatches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-1_Black.webp?v=1758827355',
    tags: ['New'],
    variants: [
      { sku: 'CT-AURA2-1', option1: 'Obsidian Black', price: 84.99, inventory: 1026, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-1_Black.webp?v=1758827355' },
      { sku: 'CT-AURA2-2', option1: 'Deepest Blue', price: 84.99, inventory: 432, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-2.webp?v=1763491859' },
      { sku: 'CT-AURA2-5', option1: 'Rose Gold', price: 84.99, inventory: 882, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-5.webp?v=1763491859' },
      { sku: 'CT-AURA2-8', option1: 'Wolf Gray', price: 84.99, inventory: 406, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-8.webp?v=1763491859' },
      { sku: 'CT-AURA2-9', option1: 'Mocha Brown', price: 84.99, inventory: 376, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-9.webp?v=1763491859' }
    ]
  },
  {
    id: 'viva-2', handle: 'viva-2', title: 'VIVA 2',
    description: 'Smartwatch AMOLED 1.85", VITA AI, +100 modos deportivos y llamadas.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Smartwatches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVA2-1.webp?v=1758819579',
    tags: ['New'],
    variants: [
      { sku: 'CT-VIVA2-1', option1: 'Obsidian Black', price: 69.99, inventory: 711, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVA2-1.webp?v=1758819579' },
      { sku: 'CT-VIVA2-2', option1: 'Deepest Blue', price: 69.99, inventory: 343, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVA2-2.webp?v=1758819667' },
      { sku: 'CT-VIVA2-4', option1: 'Dusty Lilac', price: 69.99, inventory: 356, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVA2-4.webp?v=1758819667' },
      { sku: 'CT-VIVA2-5', option1: 'Rose Gold', price: 69.99, inventory: 881, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVA2-5.webp?v=1763491709' },
      { sku: 'CT-VIVA2-8', option1: 'Wolf Gray', price: 69.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-VIVA2-8.webp?v=1763491709' }
    ]
  },
  
  // --- JR & TEENS ---
  {
    id: 'cubitt-jr', handle: 'cubitt-jr', title: 'Cubitt Jr',
    description: 'Smartwatch para niños de 5 a 9 años con juegos, monitoreo de salud y control parental.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Teens',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-1-01.webp?v=1718304368',
    tags: ['Niños'],
    variants: [
      { sku: 'CTJR-1', option1: 'Obsidian Black', price: 47.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-1-01.webp?v=1718304368' },
      { sku: 'CTJR-2', option1: 'Arctic Blue', price: 47.99, inventory: 337, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-2-01.webp?v=1741708066' },
      { sku: 'CTJR-3', option1: 'Forest Green', price: 47.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-3-01.webp?v=1741708066' },
      { sku: 'CTJR-5', option1: 'Dreamy Pink', price: 47.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-5-01.webp?v=1741708066' },
      { sku: 'CTJR-6', option1: 'Dusty Lilac', price: 47.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-6-01.webp?v=1741708066' }
    ]
  },
  {
    id: 'teens', handle: 'teens', title: 'Cubitt Teens',
    description: 'Smartwatch para jóvenes activos con pantalla 1.85" y 60 modos deportivos.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Teens',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTTN-1.webp?v=1721857271',
    tags: ['Teens'],
    variants: [
      { sku: 'CTTN-1', option1: 'Obsidian Black', price: 51.99, inventory: 122, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTTN-1.webp?v=1721857271' },
      { sku: 'CTTN-2', option1: 'Deepest Blue', price: 51.99, inventory: 202, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTTN-2.webp?v=1721857239' },
      { sku: 'CTTN-3', option1: 'Forest Green', price: 51.99, inventory: 295, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTTN-3.webp?v=1721857262' },
      { sku: 'CTTN-5', option1: 'Dreamy Pink', price: 51.99, inventory: 268, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTTN-5.webp?v=1743536962' },
      { sku: 'CTTN-6', option1: 'Dusty Lilac', price: 51.99, inventory: 197, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTTN-6.webp?v=1743536962' }
    ]
  },
  {
    id: 'cubitt-jr-paw-patrol', handle: 'cubitt-jr-paw-patrol', title: 'Cubitt Jr. x Paw Patrol',
    description: 'Edición especial Paw Patrol con pantalla AMOLED 1.75" y contenido exclusivo.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Teens',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-PP2C.webp?v=1732045316',
    tags: ['Niños', 'Licencia'],
    variants: [
      { sku: 'CTJR-PP2C', option1: 'Chase Blue', price: 49.99, inventory: 171, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-PP2C.webp?v=1732045316' },
      { sku: 'CTJR-PP4M', option1: 'Marshall Red', price: 49.99, inventory: 58, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-PP4M.webp?v=1732045335' },
      { sku: 'CTJR-PP5S', option1: 'Skye Pink', price: 49.99, inventory: 349, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-PP5S.webp?v=1732045363' },
      { sku: 'CTJR-PP8R', option1: 'Rubble Yellow', price: 49.99, inventory: 308, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-PP8R.webp?v=1732045347' }
    ]
  },
  {
    id: 'cubitt-jr-disney', handle: 'cubitt-jr-disney', title: 'Cubitt Jr. x Disney',
    description: 'Edición mágica de Disney para niños de 5 a 9 años.',
    vendor: 'Cubitt Panama', category: 'Reloj', type: 'Teens',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-DY2MM.webp?v=1733346170',
    tags: ['Niños', 'Licencia'],
    variants: [
      { sku: 'CTJR-DY2MM', option1: 'Mickey Blue', price: 49.99, inventory: 219, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-DY2MM.webp?v=1733346170' },
      { sku: 'CTJR-DY5MM', option1: 'Minnie Pink', price: 49.99, inventory: 168, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-DY5MM.webp?v=1733346186' },
      { sku: 'CTJR-DY4C', option1: 'Cars Red', price: 49.99, inventory: 148, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-DY4C.webp?v=1733346201' },
      { sku: 'CTJR-DY2F', option1: 'Frozen Blue', price: 49.99, inventory: 369, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTJR-DY2F.webp?v=1733346212' }
    ]
  },

  // --- AUDIO ---
  {
    id: 'power-pro-gen2', handle: 'power-pro-gen2', title: 'Power Pro Gen2',
    description: 'Bocina Bluetooth portátil de 40W con sonido envolvente, IPX7.',
    vendor: 'Cubitt Panama', category: 'Audio', type: 'Bocinas',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPRO2-1.webp?v=1754344546',
    tags: ['Audio'],
    variants: [
      { sku: 'CT-PWPRO2-1', option1: 'Obsidian Black', price: 89.99, inventory: 38, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPRO2-1.webp?v=1754344546' },
      { sku: 'CT-PWPRO2-2', option1: 'Deepest Blue', price: 89.99, inventory: 193, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPRO2-2.webp?v=1754663808' },
      { sku: 'CT-PWPRO2-8', option1: 'Gun Metal', price: 89.99, inventory: 117, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPRO2-8.webp?v=1754663808' }
    ]
  },
  {
    id: 'power-plus-gen2', handle: 'power-plus-gen2', title: 'Power Plus Gen2',
    description: 'Bocina Bluetooth con sonido 30W, 12 horas de música y resistencia IPX7.',
    vendor: 'Cubitt Panama', category: 'Audio', type: 'Bocinas',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPLUS2-1.webp?v=1754344278',
    tags: ['Audio'],
    variants: [
      { sku: 'CT-PWPLUS2-1', option1: 'Obsidian Black', price: 69.99, inventory: 120, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPLUS2-1.webp?v=1754344278' },
      { sku: 'CT-PWPLUS2-2', option1: 'Deepest Blue', price: 69.99, inventory: 123, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPLUS2-2.webp?v=1754663720' },
      { sku: 'CT-PWPLUS2-7', option1: 'Light Silver', price: 69.99, inventory: 154, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWPLUS2-7.webp?v=1754663720' }
    ]
  },
  {
    id: 'power-go-gen2', handle: 'power-go-gen2', title: 'Power Go Gen2',
    description: 'Bocina compacta de 16W, 9 horas de batería y resistencia al agua.',
    vendor: 'Cubitt Panama', category: 'Audio', type: 'Bocinas',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWGO2-1.webp?v=1754344016',
    tags: ['Audio'],
    variants: [
      { sku: 'CT-PWGO2-1', option1: 'Obsidian Black', price: 44.99, inventory: 127, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWGO2-1.webp?v=1754344016' },
      { sku: 'CT-PWGO2-2', option1: 'Deepest Blue', price: 44.99, inventory: 100, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWGO2-2.webp?v=1754663327' },
      { sku: 'CT-PWGO2-7', option1: 'Light Silver', price: 44.99, inventory: 214, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWGO2-7.webp?v=1754663327' }
    ]
  },
  {
    id: 'cubitt-power-headphones', handle: 'cubitt-power-headphones', title: 'Power Headphones',
    description: 'Cancelación activa de ruido híbrida, 60 horas de reproducción y diseño plegable.',
    vendor: 'Cubitt Panama', category: 'Audio', type: 'Audífonos',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWANC1.webp?v=1750172460',
    tags: ['Audio'],
    variants: [
      { sku: 'CT-PWANC1', option1: 'Obsidian Black', price: 49.99, inventory: -2, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWANC1.webp?v=1750172460' },
      { sku: 'CT-PWANC3', option1: 'Forest Green', price: 49.99, inventory: 356, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWANC3.webp?v=1762887991' },
      { sku: 'CT-PWANC7', option1: 'Snow White', price: 49.99, inventory: 295, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWANC7.webp?v=1762887991' }
    ]
  },
  {
    id: 'power-buds', handle: 'power-buds', title: 'Power Buds',
    description: 'Auriculares in-ear con cancelación activa de ruido y modo ambiente.',
    vendor: 'Cubitt Panama', category: 'Audio', type: 'Audífonos',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWBUDS1.webp?v=1745343013',
    tags: ['Audio', 'ANC'],
    variants: [
      { sku: 'CT-PWBUDS1', option1: 'Obsidian Black', price: 24.99, inventory: -2, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWBUDS1.webp?v=1745343013' },
      { sku: 'CT-PWBUDS4', option1: 'Dusty Lilac', price: 24.99, inventory: 119, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWBUDS4.webp?v=1764540703' },
      { sku: 'CT-PWBUDS7', option1: 'Snow White', price: 24.99, inventory: 118, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWBUDS7.webp?v=1764540703' }
    ]
  },
  {
    id: 'headphones-jr', handle: 'headphones-jr', title: 'Headphones Jr',
    description: 'Audífonos para niños con volumen limitado y materiales seguros.',
    vendor: 'Cubitt Panama', category: 'Audio', type: 'Audífonos',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTANCJR-1.png?v=1711142621',
    tags: ['Niños'],
    variants: [
      { sku: 'CTANCJR-1', option1: 'Obsidian Black', price: 19.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTANCJR-1.png?v=1711142621' },
      { sku: 'CTANCJR-2', option1: 'Sky Blue', price: 19.99, inventory: 89, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTANCJR-2.png?v=1715631466' },
      { sku: 'CTANCJR-5', option1: 'Dreamy Pink', price: 19.99, inventory: 24, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTANCJR-5.png?v=1715631466' }
    ]
  },

  // --- HIDRATACIÓN / TERMOS ---
  {
    id: 'hydro-bottle', handle: 'hydro-bottle', title: 'Hydro Bottle',
    description: 'Botella térmica de 24 oz con 2 tapas, mantiene frío 24h.',
    vendor: 'Cubitt Panama', category: 'Termos', type: 'Hidratación',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTHB24-1.webp?v=1757351226',
    tags: ['Termos'],
    variants: [
      { sku: 'CTHB24-1', option1: 'Obsidian Black', price: 19.99, inventory: -7, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTHB24-1.webp?v=1757351226' },
      { sku: 'CTHB24-1CH', option1: 'Black Cheetah', price: 19.99, inventory: 435, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTHB24-1CH-New-01.webp?v=1757351226' },
      { sku: 'CTHB24-2', option1: 'Light Blue', price: 19.99, inventory: 953, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTHB24-2.webp?v=1757351226' },
      { sku: 'CTHB24-2N', option1: 'Deepest Blue', price: 19.99, inventory: 475, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTHB24-2N.webp?v=1757351226' },
      { sku: 'CTHB24-9S', option1: 'Sand', price: 19.99, inventory: 658, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTHB24-9S.webp?v=1766508431' }
    ]
  },
  {
    id: 'tumbler', handle: 'tumbler', title: 'Tumbler',
    description: 'Termo 40 oz con aislamiento al vacío y mango ergonómico.',
    vendor: 'Cubitt Panama', category: 'Termos', type: 'Hidratación',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMB1.webp?v=1751911134',
    tags: ['Popular'],
    variants: [
      { sku: 'CT-TUMB1', option1: 'Obsidian Black', price: 24.99, inventory: 324, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMB1.webp?v=1751911134' },
      { sku: 'CT-TUMB2', option1: 'Light Blue', price: 24.99, inventory: 321, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMB2Spill-Free.webp?v=1756970616' },
      { sku: 'CT-TUMB3M', option1: 'Mint Green', price: 24.99, inventory: 505, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMB3MSpill-Free.webp?v=1756970616' },
      { sku: 'CT-TUMB4', option1: 'Lilac', price: 24.99, inventory: 377, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMB4Spill-Free.webp?v=1756970616' },
      { sku: 'CT-TUMB9', option1: 'Sand', price: 24.99, inventory: 100, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMB9Spill-Free.webp?v=1756970616' }
    ]
  },
  {
    id: 'mini-tumbler', handle: 'mini-tumbler', title: 'Mini Tumbler',
    description: 'Versión compacta de 24 oz, ideal para niños y viajes.',
    vendor: 'Cubitt Panama', category: 'Termos', type: 'Hidratación',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMBS1.webp?v=1765556422',
    tags: ['Niños'],
    variants: [
      { sku: 'CT-TUMBS1', option1: 'Obsidian Black', price: 19.99, inventory: 277, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMBS1.webp?v=1765556422' },
      { sku: 'CT-TUMBS2', option1: 'Light Blue', price: 19.99, inventory: 12, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMBS2.webp?v=1765556422' },
      { sku: 'CT-TUMBS4', option1: 'Lilac', price: 19.99, inventory: 336, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TUMBS4.webp?v=1765556422' }
    ]
  },
  {
    id: 'travel-mug-spill-free', handle: 'travel-mug-spill-free', title: 'Travel Mug Spill-Free',
    description: 'Taza de viaje a prueba de derrames, mantiene calor 6h y frío 12h.',
    vendor: 'Cubitt Panama', category: 'Termos', type: 'Hidratación',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUG1-N.webp?v=1764705323',
    tags: ['Café'],
    variants: [
      { sku: 'CT-MUG1', option1: 'Obsidian Black', price: 19.99, inventory: 266, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUG1-N.webp?v=1764705323' },
      { sku: 'CT-MUG2', option1: 'Deepest Blue', price: 19.99, inventory: 463, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUG2-N.webp?v=1764705323' },
      { sku: 'CT-MUG9', option1: 'Sand', price: 19.99, inventory: 493, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUG9-N.webp?v=1764705323' }
    ]
  },
  {
    id: 'kids-cup', handle: 'kids-cup', title: 'Kids Cup',
    description: 'Vaso antiderrames para niños, resistente y divertido.',
    vendor: 'Cubitt Panama', category: 'Termos', type: 'Hidratación',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUGS1-2.webp?v=1747235464',
    tags: ['Niños'],
    variants: [
      { sku: 'CT-MUGS1', option1: 'Obsidian Black', price: 17.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUGS1-2.webp?v=1747235464' },
      { sku: 'CT-MUGS2', option1: 'Deepest Blue', price: 17.99, inventory: 204, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUGS2-2.webp?v=1747235464' },
      { sku: 'CT-MUGS25', option1: 'Cotton Candy', price: 17.99, inventory: 93, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-MUGS25-2.webp?v=1747235464' }
    ]
  },
  {
    id: 'termo-jr', handle: 'termo-jr', title: 'Termo Jr',
    description: 'Botella térmica de 14 oz con boquilla suave para niños.',
    vendor: 'Cubitt Panama', category: 'Termos', type: 'Hidratación',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBJ-1-b.webp?v=1734022290',
    tags: ['Niños'],
    variants: [
      { sku: 'CTBJ-1', option1: 'Obsidian Black', price: 15.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBJ-1-b.webp?v=1734022290' },
      { sku: 'CTBJ-4', option1: 'Lilac', price: 15.99, inventory: 217, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBJ-4-b.webp?v=1736192725' },
      { sku: 'CTBJ-5F', option1: 'Hot Pink', price: 15.99, inventory: 156, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBJ-5F-b.webp?v=1736192725' }
    ]
  },

  // --- ACCESORIOS ---
  {
    id: 'backpack', handle: 'backpack', title: 'Backpack',
    description: 'Mochila resistente al agua ideal para el día a día.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBPK-1.webp?v=1749567433',
    tags: ['Bolsos'],
    variants: [
      { sku: 'CTBPK-1', option1: 'Obsidian Black', price: 44.99, inventory: 106, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBPK-1.webp?v=1749567433' },
      { sku: 'CTBPK-2', option1: 'Smoke Blue', price: 44.99, inventory: 324, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBPK-2.webp?v=1754670628' },
      { sku: 'CTBPK-3', option1: 'Olive Green', price: 44.99, inventory: 300, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBPK-3.webp?v=1766509569' },
      { sku: 'CTBPK-4', option1: 'Dusty Mauve', price: 44.99, inventory: 280, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBPK-4.webp?v=1766509569' },
      { sku: 'CTBPK-9', option1: 'Warm Beige', price: 44.99, inventory: 183, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBPK-9.webp?v=1766509569' }
    ]
  },
  {
    id: 'belt-bag', handle: 'belt-bag', title: 'Belt Bag',
    description: 'Bolso tipo cangurera minimalista y funcional.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBLT-1.webp?v=1750457224',
    tags: ['Bolsos'],
    variants: [
      { sku: 'CTBLT-1', option1: 'Obsidian Black', price: 19.99, inventory: 146, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBLT-1.webp?v=1750457224' },
      { sku: 'CTBLT-2', option1: 'Smoke Blue', price: 19.99, inventory: 169, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBLT-2.webp?v=1754671014' },
      { sku: 'CTBLT-3', option1: 'Olive Green', price: 19.99, inventory: 235, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTBLT-3a.webp?v=1767811765' }
    ]
  },
  {
    id: 'duffle-bag', handle: 'duffle-bag', title: 'Duffle Bag',
    description: 'Bolso deportivo espacioso con compartimento para zapatos.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTDUF-1..webp?v=1749759839',
    tags: ['Bolsos'],
    variants: [
      { sku: 'CTDUF-1', option1: 'Obsidian Black', price: 44.99, inventory: 120, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTDUF-1..webp?v=1749759839' },
      { sku: 'CTDUF-2', option1: 'Smoke Blue', price: 44.99, inventory: 118, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTDUF-2.webp?v=1754670840' },
      { sku: 'CTDUF-9', option1: 'Warm Beige', price: 44.99, inventory: 160, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTDUF-9.webp?v=1754670840' }
    ]
  },
  {
    id: 'tote-bag', handle: 'tote-bag', title: 'Tote Bag',
    description: 'Bolso tote versátil para el gimnasio o el día a día.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TOTE1NY.webp?v=1736201295',
    tags: ['Bolsos'],
    variants: [
      { sku: 'CT-TOTE1NY', option1: 'Obsidian Black', price: 9.99, inventory: 28, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TOTE1NY.webp?v=1736201295' },
      { sku: 'CT-TOTE2IT', option1: 'Deepest Blue', price: 9.99, inventory: 45, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-TOTE2IT.webp?v=1736201295' }
    ]
  },
  {
    id: 'sports-belt', handle: 'sports-belt', title: 'Sports Belt',
    description: 'Cinturón deportivo para correr, expandible y cómodo.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/SportBeltCubittCTSB-1Black01.webp?v=1718314887',
    tags: ['Deporte'],
    variants: [
      { sku: 'CTSB-1', option1: 'Obsidian Black', price: 14.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/SportBeltCubittCTSB-1Black01.webp?v=1718314887' },
      { sku: 'CTSB-2', option1: 'Smoke Teal', price: 14.99, inventory: 7, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/Sport_Belt_Cubitt_CTSB-2-01.webp?v=1718314909' },
      { sku: 'CTSB-3', option1: 'Dreamy Pink', price: 14.99, inventory: 103, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/Sport_Belt_Cubitt_CTSB-5_Powder_Pink_01.webp?v=1718314954' },
      { sku: 'CTSB-3M', option1: 'Olive Green', price: 14.99, inventory: 60, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/Sport_Belt_Cubitt_CTSB-3M-01.webp?v=1718314934' }
    ]
  },
  {
    id: 'gorra-cubitt', handle: 'gorra-cubitt', title: 'Gorra Cubitt',
    description: 'Gorra deportiva de secado rápido y ajustable.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTCAP-1E.webp?v=1728419495',
    tags: ['Ropa'],
    variants: [
      { sku: 'CTCAP-1E', option1: 'Obsidian Black', price: 19.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTCAP-1E.webp?v=1728419495' },
      { sku: 'CTCAP-7E', option1: 'Snow White', price: 19.99, inventory: 27, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTCAP-7E.webp?v=1728420364' },
      { sku: 'CTCAP-9E', option1: 'Terracotta', price: 19.99, inventory: 16, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTCAP-9E.webp?v=1728420451' }
    ]
  },
  {
    id: 'cubitt-bascula-inteligente', handle: 'cubitt-bascula-inteligente', title: 'Báscula Corporal',
    description: 'Báscula inteligente con análisis corporal completo.',
    vendor: 'Cubitt Panama', category: 'Básculas', type: 'Básculas',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-SCALE-D-01.webp?v=1735591177',
    tags: ['Salud'],
    variants: [
      { sku: 'CT-SCALE', option1: 'Obsidian Black', price: 24.99, inventory: 11, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-SCALE-D-01.webp?v=1735591177' },
      { sku: 'CT-SCALE7', option1: 'Snow White', price: 24.99, inventory: 103, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-Scale-C-01.webp?v=1735591177' },
      { sku: 'CT-SCALE8', option1: 'Wolf Gray', price: 24.99, inventory: 0, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-SCALE-01.webp?v=1735591177' }
    ]
  },
  {
    id: 'bascula-inteligente-de-cocina', handle: 'bascula-inteligente-de-cocina', title: 'Báscula de Cocina',
    description: 'Báscula de precisión para alimentos con conexión Bluetooth.',
    vendor: 'Cubitt Panama', category: 'Básculas', type: 'Básculas',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTK-1-D-01.webp?v=1718396474',
    tags: ['Cocina'],
    variants: [
      { sku: 'CTK-1', option1: 'Obsidian Black', price: 19.99, inventory: 173, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTK-1-D-01.webp?v=1718396474' },
      { sku: 'CTK-7', option1: 'Snow White', price: 19.99, inventory: 315, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTK-7-D-01.webp?v=1718396474' }
    ]
  },
  {
    id: 'scrunchies-cubitt', handle: 'scrunchies-cubitt', title: 'Scrunchies',
    description: 'Set de ligas para el cabello deportivas.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Accesorios',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTSC-1.webp?v=1733436533',
    tags: ['Ropa'],
    variants: [
      { sku: 'CTSC-1', option1: 'Obsidian Black', price: 2.99, inventory: 329, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTSC-1.webp?v=1733436533' },
      { sku: 'CTSC-0', option1: 'Butter Yellow', price: 2.99, inventory: 171, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTSC-0.webp?v=1768935569' },
      { sku: 'CTSC-2', option1: 'Light Blue', price: 2.99, inventory: 139, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTSC-2.webp?v=1768936187' }
    ]
  },
  {
    id: 'bandas-de-resistencia', handle: 'bandas-de-resistencia', title: 'Bandas de Resistencia',
    description: 'Set de 3 bandas elásticas para ejercicio.',
    vendor: 'Cubitt Panama', category: 'Accesorios', type: 'Deporte',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTRB-3P.webp?v=1739830065',
    tags: ['Deporte'],
    variants: [
      { sku: 'CTRB-3P', option1: 'Multicolor', price: 14.99, inventory: 30, image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CTRB-3P.webp?v=1739830065' }
    ]
  }
];
